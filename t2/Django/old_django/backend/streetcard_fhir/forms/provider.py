from django.contrib.auth.forms import UserCreationForm
from streetcard_fhir.models import User

class ProviderSignUpForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User

    def save(self, commit=True):
        user = super().save(commit=False)
        user.is_provider = True
        if commit:
            user.save()
        return user