from PIL import Image
import pytesseract
import re
from datetime import datetime

def extract_information(img_path):
    # Use pytesseract to do OCR on the image
    image = Image.open(img_path)
    text = pytesseract.image_to_string(image)

    # Extract and standardize dates
    date_pattern = r'\d{2}/\d{2}/\d{4}'
    dates = re.findall(date_pattern, text)
    standard_dates = [datetime.strptime(date, '%d/%m/%Y').strftime('%Y-%m-%d') for date in dates]

    # Extract room names
    room_pattern = r'Room: (\w+)'
    room_names = re.findall(room_pattern, text)

    # Extract and clean room rates
    rate_pattern = r'Rate: \$([\d,]+)'
    room_rates = re.findall(rate_pattern, text)
    room_rates = [rate.replace(',', '') for rate in room_rates]

    # Extract and standardize names
    name_pattern = r'From: ([\w\s]+), ([\w\s]+) <'
    names = re.findall(name_pattern, text)
    standard_names = [f'{name[1].strip()} {name[0].strip()}' for name in names]

    # Extract email addresses
    email_pattern = r'[\w\.-]+@[\w\.-]+'
    emails = re.findall(email_pattern, text)

    return standard_dates, room_names, room_rates, standard_names, emails

# Replace 'your_image.png' with the path to the image you want to process.
info = extract_information('rihal_email.png')

# Output the information
for category in info:
    print(category)

