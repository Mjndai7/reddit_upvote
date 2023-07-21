from django.db import models
from  botustech.models  import RegisteredUsers


# Create your models here.
class Transaction(models.Model):
    customer_id = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    package = models.CharField(max_length=255)
    status = models.CharField(max_length=20)
    invoice_id = models.CharField(max_length=255, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Transaction: {self.customer_id} - ${self.amount} - {self.package}"
    
