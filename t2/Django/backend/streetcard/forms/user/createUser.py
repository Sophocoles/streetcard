from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from streetcard.models import CustomUser

class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField(max_length=200, help_text='Required')
    first_name = forms.CharField(max_length=30, help_text='Required')
    last_name = forms.CharField(max_length=30, help_text='Required')
    user_type = forms.ChoiceField(choices=[('client', 'Client'), ('provider', 'Provider')])

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'first_name', 'last_name', 'password1', 'password2', 'user_type')

class CustomUserChangeForm(forms.ModelForm):
    email = forms.EmailField(max_length=200)
    first_name = forms.CharField(max_length=30)
    last_name = forms.CharField(max_length=30)

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'first_name', 'last_name')