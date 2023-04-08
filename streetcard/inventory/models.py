from django.db import models
from django.contrib.postgres.fields import ArrayField
from jsonfield import JSONField

#Client model represents the homeless persons (Using autogenerated keys, this could be tied to qr id)
#This model will be the top level model for client for the Street Card info, using for testing here
class Client(models.Model):
    firstname = models.CharField(max_length=30)
    middlename = models.CharField(max_length=30)
    lastname = models.CharField(max_length=30)
    json = JSONField(default='{}');
    credit = models.IntegerField(null=True)
    
#Item model epresents Items that are part of the Inventory (Using autogenerated keys)
class Item(models.Model):
    CATEGORY_CHOICES =(
        ('','Select Category:'),
        ('CLOTHES','CLOTHES'),
        ('EQUIPMENT','EQUIPMENT'),
        ('ELECTRONICS','ELECTRONICS'),
        ('TOOLS','TOOLS'),
        ('MISC','MISC'),
    )
    TYPE_CHOICES=(
        ('PURCHASED','PURCHASED'),
        ('DONATION','DONATION'),
        ('OTHER','OTHER'),
    )
    description = models.CharField(max_length=30)
    qty = models.IntegerField()
    category = models.CharField(max_length=15,
                                choices=CATEGORY_CHOICES,
                                default = "")
    type = models.CharField(max_length=10, 
                            choices=TYPE_CHOICES,
                            default = 'pur')
    unitcost = models.DecimalField(max_digits=6, decimal_places=2)
    itemlimit = models.IntegerField()

    def __str__(self):
        return f"'{self.description}'"
