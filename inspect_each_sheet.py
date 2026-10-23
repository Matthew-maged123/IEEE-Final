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
    
    # Outer 5 pixels background estimation
    bg = np.median(np.concatenate([arr[:5, :, :].reshape(-1, 3), arr[-5:, :, :].reshape(-1, 3), arr[:, :5, :].reshape(-1, 3), arr[:, -5:, :].reshape(-1, 3)]), axis=0)
    diff = np.linalg.norm(arr - bg, axis=2)
    
    print(f"\n==============================")
    print(f"Sheet: {name} ({w}x{h}, {cols}x{rows}), BG: {bg.astype(int)}")
    
    # For tshirt, let's see why there were white divider lines
    # Let's inspect the column profiles in slices
    # Let's check where the items are in each cell:
    for r in range(rows):
        y_slice = (int(h * r / rows), int(h * (r + 1) / rows))
        print(f"  Row {r} (y={y_slice[0]}..{y_slice[1]}):")
        for c in range(cols):
            x_slice = (int(w * c / cols), int(w * (c + 1) / cols))
            sub = diff[y_slice[0]:y_slice[1], x_slice[0]:x_slice[1]]
            # Find bounding box of content with diff > 15
            cy, cx = np.where(sub > 15)
            if len(cx) > 0:
                abs_x1 = x_slice[0] + cx.min()
                abs_x2 = x_slice[0] + cx.max()
                abs_y1 = y_slice[0] + cy.min()
                abs_y2 = y_slice[0] + cy.max()
                print(f"    Col {c}: item bbox=[x: {abs_x1}..{abs_x2} (w={abs_x2-abs_x1}), y: {abs_y1}..{abs_y2} (h={abs_y2-abs_y1})]")
            else:
                print(f"    Col {c}: EMPTY")
