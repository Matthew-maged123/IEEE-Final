import os
from PIL import Image

base_dir = r"D:\IEEE\Pictures OF Brand\Pictures of Clothes"
out_dir = os.path.join(base_dir, "products")
os.makedirs(out_dir, exist_ok=True)

sheets = [
    {
        "name": "tshirt",
        "file": os.path.join(base_dir, "T-Shirts", "Gemini_Generated_Image_tf8axvtf8axvtf8a.jpg"),
        "cols": ["white", "black", "grey", "green", "cream"],
        "rows": ["front", "back"],
        "pattern": "tshirt-{color}-{view}.png",
        "xs": [0, 275, 550, 825, 1101, 1376],
        "ys": [0, 384, 768]
    },
    {
        "name": "hoodie",
        "file": os.path.join(base_dir, "Hodies", "Gemini_Generated_Image_9ljvm49ljvm49ljv.jpg"),
        "cols": ["black", "white", "grey", "green", "cream"],
        "rows": ["front", "back"],
        "pattern": "hoodie-{color}-{view}.png",
        "xs": [0, 272, 548, 824, 1098, 1376],
        "ys": [0, 384, 768]
    },
    {
        "name": "cap",
        "file": os.path.join(base_dir, "Caps", "Gemini_Generated_Image_wphdpgwphdpgwphd.jpg"),
        "cols": ["black", "white", "green", "grey", "cream"],
        "rows": ["front", "side"],
        "pattern": "cap-{color}-{view}.png",
        "xs": [0, 275, 550, 825, 1101, 1376],
        "ys": [0, 384, 768]
    },
    {
        "name": "mug",
        "file": os.path.join(base_dir, "Mugs", "Gemini_Generated_Image_waxgzdwaxgzdwaxg.jpg"),
        "cols": ["white", "black", "green", "grey", "cream"],
        "rows": [""],
        "pattern": "mug-{color}.png",
        "xs": [0, 295, 576, 837, 1100, 1376],
        "ys": [0, 768]
    },
    {
        "name": "case",
        "file": os.path.join(base_dir, "Phones Cover", "Gemini_Generated_Image_anjp4kanjp4kanjp.jpg"),
        "cols": ["black", "white", "green", "grey", "cream"],
        "rows": [""],
        "pattern": "case-{color}-back.png",
        "xs": [0, 272, 540, 810, 1078, 1376],
        "ys": [0, 768]
    },
    {
        "name": "mug-turntable",
        "file": os.path.join(base_dir, "Mugs", "8-Cups For Rotating", "Gemini_Generated_Image_ns12rsns12rsns12.jpg"),
        "angles": [0, 45, 90, 135, 180, 225, 270, 315],
        "pattern": "mug-white-{angle}.png",
        "xs": [0, 344, 688, 1032, 1376],
        "ys": [0, 384, 768]
    }
]

created_files = []
missing_sheets = []

for sheet in sheets:
    fpath = sheet["file"]
    if not os.path.exists(fpath):
        missing_sheets.append((sheet["name"], fpath))
        continue
    
    im = Image.open(fpath)
    xs = sheet["xs"]
    ys = sheet["ys"]
    
    if "angles" in sheet:
        angles = sheet["angles"]
        idx = 0
        for r in range(len(ys) - 1):
            for c in range(len(xs) - 1):
                box = (xs[c], ys[r], xs[c+1], ys[r+1])
                crop_im = im.crop(box)
                angle = angles[idx]
                fname = sheet["pattern"].format(angle=angle)
                out_path = os.path.join(out_dir, fname)
                crop_im.save(out_path, format="PNG")
                created_files.append((fname, crop_im.size, sheet["name"]))
                idx += 1
    else:
        cols = sheet["cols"]
        rows = sheet["rows"]
        for r_idx, row_name in enumerate(rows):
            for c_idx, col_name in enumerate(cols):
                box = (xs[c_idx], ys[r_idx], xs[c_idx+1], ys[r_idx+1])
                crop_im = im.crop(box)
                if row_name:
                    fname = sheet["pattern"].format(color=col_name, view=row_name)
                else:
                    fname = sheet["pattern"].format(color=col_name)
                out_path = os.path.join(out_dir, fname)
                crop_im.save(out_path, format="PNG")
                created_files.append((fname, crop_im.size, sheet["name"]))

print(f"DONE: {len(created_files)} files created.")
if missing_sheets:
    print(f"Missing sheets: {missing_sheets}")
