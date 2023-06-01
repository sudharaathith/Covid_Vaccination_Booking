from .serializer import *
from .models import *
from datetime import datetime

def getdate(date):
    return datetime(date[0],date[1],date[2])

def searchCenter(post):
    search = post['search']
    order = post.get('order')
    user = post.get('user')
    reverse = post.get('reverse')
    v = VaccinationCenter.objects.filter(center_name__icontains=search)
    if order in ['center_name', 'starting_date', 'end_date']:
        v = v.order_by(order)
    if user:
        u = User.objects.filter(username=user)
        print(u[0])
        if u.exists():
            v = v.filter(created_by=u[0])
    if reverse.lower() == "true":
        v =v.reverse()
    return VaccinationCenterSerializer(v,many=True).data

def addCenter(post):
    center_name = post['center_name']
    starting_date = getdate(post['starting_date'])
    end_date = getdate(post['end_date'])
    created_by = post['created_by']
    v = VaccinationCenter.objects.create(
        center_name=center_name,
        starting_date=starting_date,
        end_date=end_date,
        created_by=created_by,
                                     )
    v.save()
    