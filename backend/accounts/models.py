from django.db import models

# Create your models here.

from django.db import models
import uuid
from PIL import Image
import datetime
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from phonenumber_field.modelfields import PhoneNumberField

from .managers import CustomUserManager

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=255, db_index=True, unique=True)
    public_id = models.UUIDField(db_index=True, unique=True,
                                 default=uuid.uuid4, editable=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    phone_no = PhoneNumberField(blank=True)
    created = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now_add=True)
    date_joined = models.DateField(default=datetime.date.today)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username'] # email is already required.

    def get_full_name(self):
        return self.username
    
    def __str__(self):
        return self.email


class userProfile(models.Model):
    email = models.EmailField(max_length=255, unique=True)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='user_profile')
    phone_no = PhoneNumberField(blank=True)
    date_added = models.DateField(default=datetime.date.today)
    image = models.ImageField(default='default.png',upload_to='media')
    public_id = models.UUIDField(db_index=True, unique=True,
                                 default=uuid.uuid4, editable=False)

    def __str__(self):
        return self.user.username
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        img = Image.open(self.image.path)
        if img.height > 300 or img.width > 300:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.image.path)
            
