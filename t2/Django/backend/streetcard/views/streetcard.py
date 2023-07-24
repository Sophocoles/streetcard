from django.forms.models import model_to_dict
from django.http import JsonResponse

from streetcard.forms import createUser

def my_form(request):
    form = MyForm()
    form_dict = model_to_dict(form)
    return JsonResponse(form_dict)
