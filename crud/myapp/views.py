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
        
    def put(self , request,id):
        product=Product.objects.get(id=id)
        data=json.loads(request.body)
        form=ProductForm(data,instance=product)
        if form.is_valid():
            product.save()
            return JsonResponse({'id':product.id,'name':product.name,'price':product.price})
        else:
            return JsonResponse(form.errors,status=400)
    def delete(self, request, id):
    
        product = Product.objects.get(id=id)
        product.delete()
        return JsonResponse({'message': 'Product deleted successfully'}, status=204)
    
        return JsonResponse({'error': 'Product not found'}, status=404)
