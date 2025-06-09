from django.shortcuts import render
import json
from django.http import JsonResponse
from django.views import View
from .forms import ProductForm
from .models import Product
# Create your views here.
def home(req):
    return render(req, 'myapp/home.html')   

class ProductAPI(View):
    def get(self,request):
        Products=list(Product.objects.values('id','name','price'))
        return JsonResponse(Products,safe=False)
    def post(self , request):
        data=json.loads(request.body)
        form=ProductForm(data)
        if form.is_valid():
            product=form.save()
            return JsonResponse({'id':product.id,'name':product.name,'price':product.price})
        else:
            return JsonResponse(form.errors,status=400)