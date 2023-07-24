from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.db import transaction

from streetcard_fhir.models import Client, Agency, User

class ClientSignUpForm(UserCreationForm):
    interests = forms.ModelMultipleChoiceField(
        queryset=Agency.objects.all(),
        widget=forms.CheckboxSelectMultiple,
        required=True
    )

    class Meta(UserCreationForm.Meta):
        model = User

    @transaction.atomic
    def save(self):
        user = super().save(commit=False)
        user.is_client = True
        user.save()
        client = Client.objects.create(user=user)
        client.agencies.add(*self.cleaned_data.get('agencies'))
        return user