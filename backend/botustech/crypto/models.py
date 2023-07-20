from django.db import models

# Create your models here.
from django.db import models

class Transaction(models.Model):
    customer_id = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    package = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Transaction: {self.customer_id} - ${self.amount} - {self.package}"