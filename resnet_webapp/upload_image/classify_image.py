from PIL import Image
import numpy as np
import torch
from torchvision import models, transforms
import os
from django.conf import settings



def get_image_size(image_file):
    image = Image.open(image_file)
    image_array = np.array(image)
    return image_array.shape

def _load_model():
    resnet = models.resnet101(pretrained=True)
    return resnet

def _apply_transforms(image_file):
    preprocess = transforms.Compose([
        transforms.Resize((256,256)),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(
            mean = [0.485, 0.456, 0.406],
            std = [0.229, 0.224, 0.225]
        )
    ])
    return preprocess(image_file)

def get_resnet_prediction(image_file):
    image = Image.open(image_file).convert('RGB')
    # image_array = np.array(image)
    image_preprocessed = _apply_transforms(image)
    # image_preprocessed = torch.tensor(image_array)
    batch_image_tensor = torch.unsqueeze(image_preprocessed, 0)
    model = _load_model()
    model.eval()
    output = model(batch_image_tensor)

    with open('imagenet_classes.txt') as f:
        labels = [line.strip() for line in f.readlines()]

    _, index = torch.max(output, 1)
    precentage = torch.nn.functional.softmax(output, dim=1)[0] * 100
    _, indices = torch.sort(output, descending=True)
    top_n_indices = 1
    results = [(labels[idx], "{:.2f}".format(precentage[idx].item())) for idx in indices[0][:top_n_indices]]
    return labels[indices[0][0]]
    # return str(results).replace("'","")
