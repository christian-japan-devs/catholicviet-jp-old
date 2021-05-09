
import pika, json

#params = pika.URLParameters('amqps://iwdutcmi:iud3D6Qe79hbVVS8vEaw6LxzTP3xbXnK@cougar.rmq.cloudamqp.com/iwdutcmi')

#connection = pika.BlockingConnection(params)

#channel = connection.channel()

def publish(method, body):
    pass
    #properties = pika.BasicProperties(method)
    #channel.basic_publish(exchange='',routing_key='admin',body=json.dumps(body), properties=properties)

