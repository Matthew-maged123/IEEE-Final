import os
from PIL import Image
import numpy as np

base = r"D:\IEEE\Pictures OF Brand\Pictures of Clothes"

sheets = {
    'tshirt': {
        'path': os.path.join(base, 'T-Shirts', 'Gemini_Generated_Image_tf8axvtf8axvtf8a.jpg'),
        'cols': 5, 'rows': 2,
        'x_splits': [0, 275, 550, 825, 1101, 1376],
        'y_splits': [0, 384, 768]
    },
    'hoodie': {
        'path': os.path.join(base, 'Hodies', 'Gemini_Generated_Image_9ljvm49ljvm49ljv.jpg'),
        'cols': 5, 'rows': 2,
        'x_splits': [0, 275, 550, 825, 1101, 1376],
        'y_splits': [0, 384, 768]
    },
    'cap': {
        'path': os.path.join(base, 'Caps', 'Gemini_Generated_Image_wphdpgwphdpgwphd.jpg'),
        'cols': 5, 'rows': 2,
        'x_splits': [0, 275, 550, 825, 1101, 1376],
        'y_splits': [0, 384, 768]
    },
    'mug': {
        'path': os.path.join(base, 'Mugs', 'Gemini_Generated_Image_waxgzdwaxgzdwaxg.jpg'),
        'cols': 5, 'rows': 1,
        'x_splits': [0, 275, 550, 825, 1101, 1376],
        'y_splits': [0, 768]
    },
    'case': {
        'path': os.path.join(base, 'Phones Cover', 'Gemini_Generated_Image_anjp4kanjp4kanjp.jpg'),
        'cols': 5, 'rows': 1,
        'x_splits': [0, 275, 550, 825, 1101, 1376],
        'y_splits': [0, 768]
    },
    'mug-turntable': {
        'path': os.path.join(base, 'Mugs', '8-Cups For Rotating', 'Gemini_Generated_Image_ns12rsns12rsns12.jpg'),
        'cols': 4, 'rows': 2,
        'x_splits': [0, 344, 688, 1032, 1376],
        'y_splits': [0, 384, 768]
    }
}

for name, cfg in sheets.items():
    img = Image.open(cfg['path'])
    arr = np.array(img, dtype=float)
    h, w, _ = arr.shape
    
    # Check pixels along each internal split line
    print(f"\n==============================")
    print(f"Testing sheet: {name}")
    
    # Check vertical split lines
    for x in cfg['x_splits'][1:-1]:
        # Check a strip of 3 pixels around split line: x-1, x, x+1
        strip = arr[:, max(0, x-1):min(w, x+2)]
        # We want to know if there is actual product detail or if it is background / divider
        # Background is near [225-255, 225-255, 220-255]
        min_c = strip.min(axis=(1,2))
        dark_pixels = np.where(min_c < 180)[0]
        if len(dark_pixels) > 0:
            print(f"  WARNING: x={x} has {len(dark_pixels)} dark pixels (min={min_c.min():.0f}) at y={dark_pixels[:5]}...")
        else:
            print(f"  OK: x={x} is clean (min={min_c.min():.0f})")
            
    # Check horizontal split lines
    for y in cfg['y_splits'][1:-1]:
        strip = arr[max(0, y-1):min(h, y+2), :]
        min_c = strip.min(axis=(0,2))
        dark_pixels = np.where(min_c < 180)[0]
        if len(dark_pixels) > 0:
            print(f"  WARNING: y={y} has {len(dark_pixels)} dark pixels (min={min_c.min():.0f}) at x={dark_pixels[:5]}...")
        else:
            print(f"  OK: y={y} is clean (min={min_c.min():.0f})")
