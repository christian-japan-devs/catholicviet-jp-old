from django.apps import AppConfig


class AdminappConfig(AppConfig):
    name = 'adminapp'

    def ready(self):
        import adminapp.signals