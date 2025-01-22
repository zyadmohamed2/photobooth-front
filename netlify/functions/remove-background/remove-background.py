from flask import Flask, request, jsonify
import json
import base64
from io import BytesIO
from PIL import Image
from rembg import remove
import os

def handler(event, context):
    try:
        # Parse request body
        body = json.loads(event['body'])
        image_data = body.get('image')
        
        if not image_data:
            return {
                'statusCode': 400,
                'body': json.dumps({
                    'error': 'No image data provided'
                })
            }

        # Decode the base64 string
        img_data = base64.b64decode(image_data)
        img = Image.open(BytesIO(img_data))

        # Remove background
        result = remove(img)

        # Convert result back to base64
        buffered = BytesIO()
        result.save(buffered, format="PNG")
        result_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')

        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': json.dumps({
                'image': result_base64
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': str(e)
            })
        }