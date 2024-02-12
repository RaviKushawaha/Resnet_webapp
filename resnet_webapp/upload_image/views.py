# from django.shortcuts import render, redirect
# from .forms import ImageUploadForm
# from .classify_image import get_image_size, get_resnet_prediction
# from PIL import Image
# import numpy as np

# def upload_image(request):
#     if request.method == "POST" :
#         form = ImageUploadForm(request.POST, request.FILES)

#         if form.is_valid():
#             instance = form.save()
#             # return redirect('success')

#             image_file = request.FILES['image']
#             image_size = get_image_size(image_file)

#             image_pred = get_resnet_prediction(image_file)
#             # image_text = f"The image size is {image_size} pixels"
#             image_text = image_pred
            
#             # return render(request, 'upload_image.html', {'form': form, 'instance': instance})
#             return render(request, 'upload_image.html', {'form': form, 'image_text': image_text})
        
#     else:
#         form = ImageUploadForm()
#         image_text = ''
#         return render(request, 'upload_image.html', {'form': form, 'image_text': image_text})

#     return render(request, 'upload_image.html', {'form':form})
    

from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .serializers import UploadedImageSerializer
from django.conf import settings
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import os
from .classify_image import get_image_size, get_resnet_prediction


class ImageUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        if 'image' in request.data:
            image_serializer = UploadedImageSerializer(data=request.data)

        elif 'base64image' in request.data:
            format, imgstr = request.data['base64image'].split(';base64,')
            ext = format.split('/')[-1]
            image = ContentFile(ContentFile(imgstr, name='temp.' + ext).read())
            request.data['image'] = image
            image_serializer = UploadedImageSerializer(data=request.data)
        

        if image_serializer.is_valid():
            image_instance = image_serializer.save()
            # image_path = default_storage.save(image_instance.image.name, ContentFile(image_instance.image.read()))
            image_size = get_image_size(image_instance.image.path)
            image_pred = get_resnet_prediction(image_instance.image.path)
            image_url = request.build_absolute_uri(image_instance.image.url)
#             
            # image_text = f"This is a valid image with size {image_size}" + " : " + image_pred
            image_text = "AI prediction -> " + image_pred

            default_storage.delete(image_instance.image.path)

            return Response({
                'imageUrl': request.build_absolute_uri(image_instance.image.url), 'image_text': image_text
                }, status=status.HTTP_201_CREATED)
        
        else:
            return Response(image_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

