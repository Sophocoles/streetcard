Django

To run development server

in Django StreetCard directory
    py manage.py runserver

Change port
    py manage.py runserver 8080

React
in react sc directory
    npm start

Can't resolve 'react-router-dom'
npm install react-router-dom --save
https://stackoverflow.com/questions/53914013/failed-to-compile-module-not-found-cant-resolve-react-router-dom

Conflicting eslint
must npm start from powershell due to caps issue
https://stackoverflow.com/questions/70377211/error-when-deploying-react-app-and-it-keeps-sayings-plugin-react-was-confli

Indira's README below. Related to agency directory

# Documentation for SCDirectory Project

This document provides an overview of the SCDirectory project, including the frontend and backend components.
The SCDirectory project is a web application designed to provide a directory of basic needs providers.
The application is built using Django and React.

# Backend

The backend of the SCDirectory project is built using Django, a Python-based web framework. The backend provides the following functionality:

Storage and retrieval of basic needs provider data
API endpoints for the frontend to access basic needs provider data

To run the backend of the SCDirectory project, you will need the following:

Python 3.6 or higher
Django 3.2 or higher

# Database Migration

Database Migration

Note that the database is currently using SQLite, and must be migrated to PostgreSQL in order to use the backend in production. To migrate the database, run the following commands after setting up the PostgreSQL or having access to the StreetCard database being used to store all the data:

python manage.py makemigrations
python manage.py migrate

```
This is a reminder that to migrate the database the information in backend\settings.py needs to be updated with the PostgreSQL credentials
visit https://docs.djangoproject.com/en/4.2/ref/databases/ for more details

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

# SECURITY WARNING: don't run with debug turned on in production!

go to backend/settings.py and turn it off/on accordingly
DEBUG = True for development
DEBUG = False for production

# data validation

It is important to note that the data entered into the form needs to be validated.
So far the frontend and backend are connected but the frontend needs proper data validation as well as handling duplicated user input. The form
needs proper user input handling.

# Future Changes Requested by Sponsor

The sponsor has requested the following additional fields be added to the form:

Seeking Volunteers
Vacancies
Overnight Shelter
Short Term
Long Term
Additional options in the current services offered

# Frontend

The frontend of the SCDirectory project is built using React, a JavaScript-based framework for building user interfaces. The frontend provides the following functionality:

Display basic needs provider data retrieved from the backend
Forms for adding and editing basic needs provider data

# Requirements

To run the frontend of the SCDirectory project, you will need the following (consult their respective documentation for more info):

Node.js
React
axios

# Running the Application individually

Note - This application is part of teh StreetCard project and most be integrated accordingly.

To run the application, follow these steps:

Install the required packages and dependencies:

pip install -r requirements.txt
npm install
python manage.py runserver
npm start
visit: http://localhost:3000

# Additional Notes

The frontend side of the application where all the providers are displayed in a directorly like manner
neeeds to be accesses through a link and better if accesssed through a QR code which needs to be implemented.
That side of the app is available to the public so it does not need any sort of user authentication. in the opposite,
the form where providers can add themselves to the streetcard program needs to be in teh dashboard and availavle to authenticated
providers that want to add their information. So the form needs to go in the section of the dashboard according to teh type of user.
If any doubts visit the general documentation of the project to get a better idea.
