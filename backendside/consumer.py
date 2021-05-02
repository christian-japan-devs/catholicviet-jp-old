
import pika,json

params = pika.URLParameters('amqps://iwdutcmi:iud3D6Qe79hbVVS8vEaw6LxzTP3xbXnK@cougar.rmq.cloudamqp.com/iwdutcmi')

connection = pika.BlockingConnection(params)

channel = connection.channel()

channel.queue_declare(queue='admin')

def callback(ch,method, properties,body):
    print('Received in admin')
    data = json.loads(body)
    print(data)

    if properties.content_type == 'provice_created':
        print('data created')
    elif properties.content_type == 'provice_updated':
        print('provice_updated')
    elif properties.content_type == 'provice_deleted':
        print('provice_deleted')



channel.basic_consume(queue='admin',on_message_callback=callback, auto_ack=True)

print('start consuming')

channel.start_consuming()
channel.close()



