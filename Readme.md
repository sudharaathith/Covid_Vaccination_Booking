# Covid Vaccination Booking

## Instalaltion
I have provided scripting file for installing dependency for this project.
- setup.sh (Linux)
- setup.bat (Windows)

### manual Installation

```bash
pip install virtualenv
virtualenv env
source ./env/bin/activate
```


to install, create and run the virtual enviroment if needed

```bash
pip install -r requirements.txt
```
to install required Libeary. (python should be at 3.8 or above.)
```bash
python manage.py runserver
```
to run the django framework

NOTE: Python should already be installed and Python version should be 3.8 or above.

## Tecstack
### Django
  I have used Django as my backend.  Along with DjangoREST Framework, JWT Token
### React
  I have used React as my Frontend.  Along with Tailwind CSS and Material Tailwind.

## Backend

My API paths are 
 ```python
 "api/token/"
 "api/token/refresh/"
 "api/centers/search/"
 "api/centers/add/"
 "api/centers/slot/avilable/"
 "api/centers/slot/book/"
 "api/centers/slot/booked/"
 "api/signup/"
 ```
 
 
 ### ```api/token/```
 A POST API to get access token and refresh token by sending Username and Password.
 
 Example:
 ```json 
 {
    "username":"admin",
    "passwoed":"admin"
 } 
 ```
  
 
 ### ```api/token/refresh/```
 A POST API to get new access token by sending refesh token.
 
 Example:
 ```json 
 {
    "refresh":"sdfjlshksdajljlskjlflasljsffl;asfjchvselfhekeajksdh"
 } 
 ```
  
 
  ### ```api/centers/search/```
 A POST API to get the Vaccination center name by sending search parameater and order by parameater if needed
 
 Example:
 ```json 
 {
    "search":"summa",
    "order":"name"
 } 
 ```
 
 
   ### ```api/centers/add/```
 A PUT API to add the Vaccination center by sending required Details.[Authencation, superuserpermisson]
 
 Example:
 ```json 
 {
    "center_name":"summa dhaan",
    "starting_date":"1-2-2023",
    "end_date":"2-3-2023"
 } 
 ```
  
 
   ### ```api/centers/slot/avilable/```
 A POST API to find the Avaliable Vaccination slot for a center.[Authencation]
 
 Example:
 ```json 
 {
    "center_name":"summa"
 } 
 ```
  
 
   ### ```api/centers/slot/booked/```
 A POST API to find the Booked Vaccination slot for a center and user datails.[Authencation, superuserpermisson]
 
 Example:
 ```json 
 {
    "center_name":"summa"
 } 
 ```
  
 
  ### ```api/signup/```
 A POST API to create a new user.[Authencation, superuserpermisson]
 
 Example:
 ```json 
 {
    "username":"summa",
    "password":"0",
    "date":"1-2-2023"
 } 
 ```

  
  
