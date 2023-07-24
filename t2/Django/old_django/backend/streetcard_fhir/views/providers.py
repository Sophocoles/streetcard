from django.contrib.auth import login
from django.shortcuts import redirect
from django.views.generic import CreateView

from ..forms.provider import ProviderSignUpForm
from ..models import User

class ProviderSignUpView(CreateView):
    model = User
    form_class = ProviderSignUpForm
    template_name = 'registration/signup_form.html'

    def get_context_data(self, **kwargs):
        kwargs['user_type'] = 'provider'
        return super().get_context_data(**kwargs)

    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        return redirect('providers:dash')