p
run after updating models

python manage.py makemigrations streetcard_fhir
python manage.py migrate streetcard_fhir

python manage.py runserver

Authentication is the process of verifying if the person is who they claims to be. In practical terms, it’s the process of verifying username and password (login).

Authorization is the process of verifying what this particular person is allowed to do in the application. 

https://simpleisbetterthancomplex.com/tutorial/2018/01/18/how-to-implement-multiple-user-types-with-django.html