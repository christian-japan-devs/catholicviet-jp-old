from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from .models import UserProfile
from api.controller import sendConfirmEmailToUser


@receiver(post_save, sender=User)
def create_auth_token(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(profile_user=instance)
        Token.objects.create(user=instance)
        # send account confirmation to user when account is created.
        sendConfirmEmailToUser(instance)
