from django.db import models

class RegisteredUsers(models.Model):
    name = models.CharField(max_length=255, unique=False)
    email = models.EmailField(max_length=255, unique=True)
    isadmin = models.CharField(max_length=255, unique=False)
    balance = models.CharField(max_length=255, unique=False)
    totalvotes = models.CharField(max_length=128, unique=False)
    totalcomments =models.CharField(max_length=128, unique=False)
    totalspent = models.CharField(max_length=128, unique=False)
    status = models.CharField(max_length=128, unique=False)
    package = models.FloatField(max_length=16, unique=False)
    password = models.CharField(max_length=128, unique=False)
    date_created = models.DateTimeField(auto_now_add=True)

class RedditUrls(models.Model):
    url = models.CharField(max_length=255, unique=False)
    action = models.EmailField(max_length=255, unique=False)
    number = models.CharField(max_length=255, unique=False)
    speed = models.CharField(max_length=255, unique=False)
    status = models.CharField(max_length=255, unique=False)
    cost = models.CharField(max_length=255, unique=False)
    user = models.ForeignKey(RegisteredUsers, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)

class RedditAccounts(models.Model):
    name = models.CharField(max_length=255, unique=False)
    proxies = models.EmailField(max_length=255, unique=False)
    voted = models.CharField(max_length=255, unique=False)
    commented = models.CharField(max_length=255, unique=False)
    status = models.CharField(max_length=128, unique=False)
    date_created = models.DateTimeField(auto_now_add=True)


# Create your models here.
class Transaction(models.Model):
    customer_id = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    package = models.CharField(max_length=255)
    status = models.CharField(max_length=20)
    invoice_id = models.CharField(max_length=255, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(RegisteredUsers, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"Transaction: {self.customer_id} - ${self.amount} - {self.package}"
    

