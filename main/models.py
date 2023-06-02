from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class VaccinationCenter(models.Model):
    center_name = models.CharField(max_length=100)
    starting_date = models.DateField()
    end_date = models.DateField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.center_name
    
class VaccinationSlot(models.Model):
    center = models.ForeignKey(VaccinationCenter, on_delete=models.CASCADE, unique=False)
    date = models.DateField()
    slotNumber = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.center}:{self.user}'
    

    
