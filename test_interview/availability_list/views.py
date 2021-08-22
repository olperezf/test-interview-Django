from django.template.defaulttags import register
from django.views.generic.base import TemplateView


class AvailabilityView(TemplateView):
    template_name = 'availability_list/availability_list.html'


@register.filter
def get_range(value):
    return(sorted(list(range(value)) * 2))[:-1]
