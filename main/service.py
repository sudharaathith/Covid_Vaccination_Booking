from .serializer import *
from .models import *
import datetime
from dateutil import parser

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
    if reverse:
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
    
def getSlotAvilable(post):
    center_name = post['center_name']
    v = VaccinationCenter.objects.get(center_name=center_name)
    start = v.starting_date
    end = v.end_date
    datebw = [start + datetime.timedelta(days=x) for x in range((end-start).days + 1)]
    res = {}
    for i in datebw:
        slot = [i for i in range(10)]
        val = VaccinationSlot.objects.filter(date = i, center=v)
        print(val)
        for j in val:
            slot.remove(j.slotNumber)
        res[str(i)] = slot
    return res

def bookSlots(post):
    date = post['date']
    slot = post['slot']
    avalible = getSlotAvilable(post)
    s = avalible.get(date)
    print(slot)
    if s != None:
        if (slot) in s:
            user = post['user']
            center_name = post['center_name']
            v = VaccinationCenter.objects.get(center_name=center_name)
            a =VaccinationSlot.objects.create(user=user, center=v, date=parser.parse(date), slotNumber=int(slot))
            a.save()
            print(a)
            return
    
    raise Exception("Somthing failed")
            
            
            
        
    