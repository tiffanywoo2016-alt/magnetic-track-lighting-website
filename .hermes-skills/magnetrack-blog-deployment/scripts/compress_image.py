#!/usr/bin/env python3
"""
Compress an image to WebP at quality 85.
Usage: python3 compress_image.py input.jpg [output.webp]
If output not provided, replaces extension with .webp
"""
from PIL import Image
import sys, os

if len(sys.argv) < 2:
    print("Usage: python3 compress_image.py input.jpg [output.webp]")
    sys.exit(1)

input_path = sys.argv[1]
output_path = sys.argv[2] if len(sys.argv) > 2 else os.path.splitext(input_path)[0] + '.webp'

img = Image.open(input_path).convert('RGB')
img.save(output_path, 'webp', quality=85)

orig = os.path.getsize(input_path)
compressed = os.path.getsize(output_path)
saved = 100 * (orig - compressed) // orig
print(f"Compressed: {orig//1024}KB → {compressed//1024}KB ({saved}% saved)")
print(f"Output: {output_path}")
