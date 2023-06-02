# Covid Vaccination Booking

## Installation
I have provided scripting files for installing the dependencies for this project:
- setup.sh (Linux)
- setup.bat (Windows)

### Manual Installation

```bash
pip install virtualenv
virtualenv env
source ./env/bin/activate
```

To install, create and run the virtual environment if needed.

```bash
pip install -r requirements.txt
```

To install the required libraries. (Python should be version 3.8 or above.)

```bash
python manage.py runserver
```

To run the Django framework.

NOTE: Python should already be installed, and the Python version should be 3.8 or above.

## Tech Stack
### Django
I have used Django as the backend along with Django REST Framework and JWT Token.
### React
I have used React as the frontend along with Tailwind CSS and Material Tailwind.

## Backend

The API paths are as follows:
 ```python
 "api/token/"
 "api/token/refresh/"
 "api/centers/search/"
 "api/centers/add/"
 "api/centers/slot/available/"
 "api/centers/slot/book/"
 "api/centers/slot/booked/"
 "api/signup/"
 ```
 
 
 ### ```api/token/```
 A POST API to get an access token and refresh token by sending the Username and Password.
 
 Example:
 ```json 
 {
    "username": "admin",
    "password": "admin"
 } 
 ```
  
 
 ### ```api/token/refresh/```
 A POST API to get a new access token by sending the refresh token.
 
 Example:
 ```json 
 {
    "refresh": "sdfjlshksdajljlskjlflasljsffl;asfjchvselfhekeajksdh"
 } 
 ```
  
 
  ### ```api/centers/search/```
 A POST API to get the vaccination center name by sending the search parameter and order by parameter if needed.
 
 Example:
 ```json 
 {
    "search": "summa",
    "order": "name"
 } 
 ```
 
 
   ### ```api/centers/add/```
 A PUT API to add the vaccination center by sending the required details. [Authentication, superuser permission]
 
 Example:
 ```json 
 {
    "center_name": "summa dhaan",
    "starting_date": "1-2-2023",
    "end_date": "2-3-2023"
 } 
 ```
  
 
   ### ```api/centers/slot/available/```
 A POST API to find the available vaccination slots for a center. [Authentication]
 
 Example:
 ```json 
 {
    "center_name": "summa"
 } 
 ```
  
 
   ### ```api/centers/slot/booked/```
 A POST API to find the booked vaccination slots for a center and user details. [Authentication, superuser permission]
 
 Example:
 ```json 
 {
    "center_name": "summa"
 } 
 ```
  
 
  ### ```api/signup/```
 A POST API to create a new user. [Authentication, superuser permission]
 
 Example:
 ```json 
 {
    "username": "summa",
    "password": "0",
    "date": "1-2-2023"
 } 
 ```




## Frontend

The Pages are as follow

- Home Page
- Centers Page
- Login Page
- Signup Page
- Booking Page
- Admin Centers Page
- Add Centers Page
- Centers Details Page

### Home Page

![image](https://github.com/sudharaathith/Covid_Vaccination_Booking/assets/98890534/f7e1357e-faa6-4028-af1c-5709c8d7b850)
The First Page of the Website

### Centers Page

![image](https://github.com/sudharaathith/Covid_Vaccination_Booking/assets/98890534/ffb1f941-957e-418c-94c2-63703c774928)
Page to Find Centers. it has a search bar and Three type of order by options.

### 

  
  
