import os
from PIL import Image
import numpy as np

base = r"D:\IEEE\Pictures OF Brand\Pictures of Clothes"

def analyze_sheet(name, path, cols, rows):
    img = Image.open(path)
    arr = np.array(img, dtype=float)
    h, w, _ = arr.shape
    
    # Outer background
    edge_pixels = np.concatenate([arr[:4, :, :].reshape(-1, 3), arr[-4:, :, :].reshape(-1, 3), arr[:, :4, :].reshape(-1, 3), arr[:, -4:, :].reshape(-1, 3)])
    bg = np.median(edge_pixels, axis=0)
    diff = np.linalg.norm(arr - bg, axis=2)
    
    print(f"\n--- Detailed Analysis for {name} ---")
    
    # Threshold for content
    content_mask = diff > 7.0
    
    # Let's find vertical gutters (columns)
    # Search around uniform split points
    col_divs = []
    for c in range(1, cols):
        approx = int(w * c / cols)
        # Search window of +/- 40 pixels
        sub = diff[:, approx - 40 : approx + 40]
        # Sum of difference along columns in the window
        col_sum = sub.mean(axis=0)
        best_offset = np.argmin(col_sum)
        best_x = (approx - 40) + best_offset
        min_val = col_sum[best_offset]
        col_divs.append((int(best_x), float(min_val)))
    
    row_divs = []
    if rows > 1:
        for r in range(1, rows):
            approx = int(h * r / rows)
            sub = diff[approx - 40 : approx + 40, :]
            row_sum = sub.mean(axis=1)
            best_offset = np.argmin(row_sum)
            best_y = (approx - 40) + best_offset
            min_val = row_sum[best_offset]
            row_divs.append((int(best_y), float(min_val)))
            
    print(f"Col division lines: {[x for x, val in col_divs]}")
    print(f"Col division gutter min diffs: {[round(val, 2) for x, val in col_divs]}")
    if row_divs:
        print(f"Row division lines: {[y for y, val in row_divs]}")
        print(f"Row division gutter min diffs: {[round(val, 2) for y, val in row_divs]}")
    
    # Check each cell's content bounds to see if any cell touches the division line
    xs = [0] + [x for x, _ in col_divs] + [w]
    ys = [0] + [y for y, _ in row_divs] + [h]
    
    for r in range(rows):
        for c in range(cols):
            x1, x2 = xs[c], xs[c+1]
            y1, y2 = ys[r], ys[r+1]
            cell_mask = content_mask[y1:y2, x1:x2]
            cy, cx = np.where(cell_mask)
            if len(cx) > 0:
                pad_l = cx.min()
                pad_r = (x2 - x1) - 1 - cx.max()
                pad_t = cy.min()
                pad_b = (y2 - y1) - 1 - cy.max()
                print(f"  Cell (row={r}, col={c}): bbox size={cx.max()-cx.min()}x{cy.max()-cy.min()}, padding L={pad_l}, R={pad_r}, T={pad_t}, B={pad_b}")
            else:
                print(f"  Cell (row={r}, col={c}): EMPTY")

analyze_sheet('tshirt', os.path.join(base, 'T-Shirts', 'Gemini_Generated_Image_tf8axvtf8axvtf8a.jpg'), 5, 2)
