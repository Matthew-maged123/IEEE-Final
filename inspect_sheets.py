import os
from PIL import Image
import numpy as np

base = r"D:\IEEE\Pictures OF Brand\Pictures of Clothes"

sheets = {
    'tshirt': {
        'path': os.path.join(base, 'T-Shirts', 'Gemini_Generated_Image_tf8axvtf8axvtf8a.jpg'),
        'cols': 5,
        'rows': 2,
        'col_names': ['white', 'black', 'grey', 'green', 'cream'],
        'row_names': ['front', 'back']
    },
    'hoodie': {
        'path': os.path.join(base, 'Hodies', 'Gemini_Generated_Image_9ljvm49ljvm49ljv.jpg'),
        'cols': 5,
        'rows': 2,
        'col_names': ['black', 'white', 'grey', 'green', 'cream'],
        'row_names': ['front', 'back']
    },
    'cap': {
        'path': os.path.join(base, 'Caps', 'Gemini_Generated_Image_wphdpgwphdpgwphd.jpg'),
        'cols': 5,
        'rows': 2,
        'col_names': ['black', 'white', 'green', 'grey', 'cream'],
        'row_names': ['front', 'side']
    },
    'mug': {
        'path': os.path.join(base, 'Mugs', 'Gemini_Generated_Image_waxgzdwaxgzdwaxg.jpg'),
        'cols': 5,
        'rows': 1,
        'col_names': ['white', 'black', 'green', 'grey', 'cream'],
        'row_names': ['']
    },
    'case': {
        'path': os.path.join(base, 'Phones Cover', 'Gemini_Generated_Image_anjp4kanjp4kanjp.jpg'),
        'cols': 5,
        'rows': 1,
        'col_names': ['black', 'white', 'green', 'grey', 'cream'],
        'row_names': ['back']
    },
    'mug-turntable': {
        'path': os.path.join(base, 'Mugs', '8-Cups For Rotating', 'Gemini_Generated_Image_ns12rsns12rsns12.jpg'),
        'cols': 4,
        'rows': 2,
        'col_names': ['0', '45', '90', '135'],  # row 1: 0, 45, 90, 135; row 2: 180, 225, 270, 315
        'row_names': ['r1', 'r2']
    }
}

for name, info in sheets.items():
    p = info['path']
    if not os.path.exists(p):
        print(f"MISSING: {name} at {p}")
        continue
    img = Image.open(p)
    arr = np.array(img, dtype=float)
    h, w, _ = arr.shape
    
    # Estimate background from outer 4 pixels
    edge_pixels = np.concatenate([arr[:4, :, :].reshape(-1, 3), arr[-4:, :, :].reshape(-1, 3), arr[:, :4, :].reshape(-1, 3), arr[:, -4:, :].reshape(-1, 3)])
    bg = np.median(edge_pixels, axis=0)
    diff = np.linalg.norm(arr - bg, axis=2)
    
    col_activity = diff.mean(axis=0)
    row_activity = diff.mean(axis=1)
    
    print(f"\n==============================")
    print(f"Sheet: {name} ({w}x{h}, {info['cols']} cols, {info['rows']} rows)")
    print(f"Background RGB: {bg.astype(int)}")
    
    # Let's find local minima in col_activity around expected divisions
    expected_xs = [int(w * i / info['cols']) for i in range(1, info['cols'])]
    actual_xs = []
    for ex in expected_xs:
        # Search window of +/- 35 pixels
        win_start = max(0, ex - 35)
        win_end = min(w, ex + 35)
        min_x = win_start + np.argmin(col_activity[win_start:win_end])
        actual_xs.append(min_x)
    print(f"Expected col divisions: {expected_xs}")
    print(f"Detected col divisions: {actual_xs}")
    
    # Let's find local minima in row_activity around expected divisions if rows > 1
    if info['rows'] > 1:
        expected_ys = [int(h * i / info['rows']) for i in range(1, info['rows'])]
        actual_ys = []
        for ey in expected_ys:
            win_start = max(0, ey - 35)
            win_end = min(h, ey + 35)
            min_y = win_start + np.argmin(row_activity[win_start:win_end])
            actual_ys.append(min_y)
        print(f"Expected row divisions: {expected_ys}")
        print(f"Detected row divisions: {actual_ys}")
