from django.contrib import admin
from .models import CustomUser, Client, Provider, Agency, FhirEndpoint
from .views.providers import provider_patients

class FhirEndpointAdmin(admin.ModelAdmin):
    list_display = ('name','url')
    
    def endpoint_list(self,obj):
        return ', '.join([endpoint.name for endpoint in obj.endpoints.all()])
    
class AgencyAdmin(admin.ModelAdmin):
    list_display = ('name', 'contact_person')
    
    def agencies_list(self,obj):
        return ', '.join([agency.name for agency in obj.agencies.all()])
    
class ClientAdmin(admin.ModelAdmin):
    list_display = ('user', 'providers_list', 'agencies_list')

    def providers_list(self, obj):
        return ', '.join([provider.user.username for provider in obj.providers.all()])

    providers_list.short_description = 'Providers'

    def agencies_list(self, obj):
        return ', '.join([agency.name for agency in obj.agencies.all()])

    agencies_list.short_description = 'Agencies'

class ProviderAdmin(admin.ModelAdmin):
    list_display = ('user', 'clients_list')

    def clients_list(self, obj):
        return ', '.join([client.user.username for client in obj.clients.all()])

    clients_list.short_description = 'Clients'
    
    def patients_list(self, obj):
        if obj.user.user_type != 'provider':
            return "User is not a provider"

        # Get all the clients (patients) assigned to this provider
        clients = obj.clients.all()

        # Return a comma-separated list of patients
        return ", ".join([str(client) for client in clients])

    patients_list.short_description = 'Patients'

admin.site.register(FhirEndpoint, FhirEndpointAdmin)
admin.site.register(CustomUser)
admin.site.register(Client, ClientAdmin)
admin.site.register(Provider, ProviderAdmin)
admin.site.register(Agency, AgencyAdmin)

