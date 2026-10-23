import os
from PIL import Image
import numpy as np

base = r"D:\IEEE\Pictures OF Brand\Pictures of Clothes"

sheets = {
    'tshirt': (os.path.join(base, 'T-Shirts', 'Gemini_Generated_Image_tf8axvtf8axvtf8a.jpg'), 5, 2),
    'hoodie': (os.path.join(base, 'Hodies', 'Gemini_Generated_Image_9ljvm49ljvm49ljv.jpg'), 5, 2),
    'cap': (os.path.join(base, 'Caps', 'Gemini_Generated_Image_wphdpgwphdpgwphd.jpg'), 5, 2),
    'mug': (os.path.join(base, 'Mugs', 'Gemini_Generated_Image_waxgzdwaxgzdwaxg.jpg'), 5, 1),
    'case': (os.path.join(base, 'Phones Cover', 'Gemini_Generated_Image_anjp4kanjp4kanjp.jpg'), 5, 1),
    'mug-turntable': (os.path.join(base, 'Mugs', '8-Cups For Rotating', 'Gemini_Generated_Image_ns12rsns12rsns12.jpg'), 4, 2)
}

for name, (path, cols, rows) in sheets.items():
    img = Image.open(path)
    arr = np.array(img, dtype=float)
    h, w, _ = arr.shape
    
    # Calculate difference from edge background
    edge = np.median(np.concatenate([arr[:3, :, :].reshape(-1, 3), arr[-3:, :, :].reshape(-1, 3), arr[:, :3, :].reshape(-1, 3), arr[:, -3:, :].reshape(-1, 3)]), axis=0)
    diff = np.linalg.norm(arr - edge, axis=2)
    
    # Check vertical lines in 10-pixel windows around each ideal division
    print(f"\nSheet: {name}")
    col_splits = []
    for c in range(1, cols):
        target = int(w * c / cols)
        # Search around target +/- 25
        search_range = range(target - 25, target + 25)
        # Find x with lowest total variation / activity or clear gutter
        costs = []
        for x in search_range:
            costs.append(diff[:, x].mean())
        best_x = search_range[np.argmin(costs)]
        col_splits.append(best_x)
    print(f"  Col split lines: {col_splits}")
    
    row_splits = []
    if rows > 1:
        for r in range(1, rows):
            target = int(h * r / rows)
            search_range = range(target - 25, target + 25)
            costs = [diff[y, :].mean() for y in search_range]
            best_y = search_range[np.argmin(costs)]
            row_splits.append(best_y)
        print(f"  Row split lines: {row_splits}")
