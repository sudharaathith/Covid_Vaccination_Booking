@echo off

REM Install virtualenv and create virtual environment
pip install virtualenv && virtualenv env && call .\env\Scripts\activate && pip install -r requirements.txt && python manage.py runserver



