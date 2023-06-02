from .serializer import *
from .models import *
import datetime
from dateutil import parser
from django.contrib.auth.models import User



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
    starting_date = parser.parse(post['starting_date'])
    end_date = parser.parse(post['end_date'])
    if (starting_date>end_date):
        raise Exception('Invalid starting date')
    
    created_by = post['user']
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

def GetBookedSlot(post):
    center_name = post['center_name']
    order = post.get('order')
    user = post.get('user')
    reverse = post.get('reverse')
    r = VaccinationCenter.objects.get(center_name=center_name)
    v = VaccinationSlot.objects.filter(center= r)
    if order in ['date', 'slotNumber', 'user']:
        v = v.order_by(order)
    if user:
        u = User.objects.filter(username=user)
        print(u[0])
        if u.exists():
            v = v.filter(created_by=u[0])
    if reverse:
        if reverse.lower() == "true":
            v =v.reverse()
    return VaccinationSlotSerializer(v,many=True).data
            
def Signup(post):
    try:
        username = post['username']
        password = post['password']
        email = post['email']
        
        u = User.objects.create(username=username, email=email)
        u.set_password(password)
        u.save()
        return 200
    except Exception as e:
        print(e)
        return e
        
                    
            
        
    