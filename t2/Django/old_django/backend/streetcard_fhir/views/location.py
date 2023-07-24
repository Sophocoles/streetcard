from django.shortcuts import redirect, render
from django.views.generic import TemplateView


class SignUpView(TemplateView):
    template_name = 'registration/signup.html'


def home(request):
    if request.user.is_authenticated:
        if request.user.is_provider:
            return redirect('providers:dash')
        else:
            return redirect('clients:dash')
    return render(request, 'location/home.html')