Basic setup copied from this tutorial
    https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react

User setup according to this tutorial
    https://learndjango.com/tutorials/django-custom-user-model

Auth setup from this tutorial
    https://saasitive.com/tutorial/react-token-based-authentication-django/



This Django project uses pipenv.
    Related commands

        pip install pipenv
        pipenv shell
        pip install --upgrade djangorestframework-simplejwt

python manage.py makemigrations streetcard
python manage.py migrate streetcard
python manage.py migrate --run-syncdb

python manage.py runserver

make .env file in root directory and put
    PYTHONPATH=/path/to/templates/streetcard

python manage.py createsuperuser


