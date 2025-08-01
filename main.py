import random
import csv
from datetime import datetime, timedelta

# Function to generate a realistic sample for temperature, humidity, and moisture
def generate_sample(timestamp, last_temp, last_humidity, last_moisture):
    # Temperature mimics daily fluctuation (warmer during the day, cooler at night)
    hour = timestamp.hour
    if 6 <= hour <= 18:  # Daytime
        temp_change = random.uniform(-0.2, 0.5)  # Temperature tends to rise slowly during the day
    else:  # Nighttime
        temp_change = random.uniform(-0.5, 0.2)  # Temperature tends to fall during the night
    temperature = max(10, min(40, last_temp + temp_change))  # Keep within bounds 10-40°C

    # Humidity tends to rise at night and drop during the day
    if 6 <= hour <= 18:  # Daytime
        humidity_change = random.uniform(-0.3, 0.1)  # Humidity drops slowly during the day
    else:  # Nighttime
        humidity_change = random.uniform(-0.1, 0.3)  # Humidity rises during the night
    humidity = max(30, min(90, last_humidity + humidity_change))  # Keep within bounds 30-90%

    # Soil moisture tends to drop gradually unless "watered"
    moisture_change = random.uniform(-0.1, -0.05)  # Moisture drops slowly
    if random.random() < 0.05:  # 5% chance of a "watering" event
        moisture_change = random.uniform(1, 5)  # Moisture spikes due to watering
    moisture = max(40, min(100, last_moisture + moisture_change))  # Keep within bounds 40-100%

    return [timestamp.strftime('%Y-%m-%d %H:%M:%S'), int(round(temperature, 0)), int(round(humidity, 0)), int(round(moisture, 0))]

# User input for the start date
user_input = input("Enter the start date (YYYY-MM-DD): ")

# Convert user input to a datetime object
try:
    start_time = datetime.strptime(user_input, "%Y-%m-%d")
except ValueError:
    print("Invalid date format. Please enter the date in YYYY-MM-DD format.")
    exit()

# Number of samples to generate (43,200)
num_samples = 43200

# Time interval between samples (e.g., 1 minute)
interval = timedelta(minutes=1)

# Initial conditions for temperature, humidity, and moisture
initial_temp = 25  # Starting temperature
initial_humidity = 60  # Starting humidity
initial_moisture = 70  # Starting moisture

# Open a CSV file to save the data
with open('plant_data_mimic_user_input.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    # Write the header
    writer.writerow(["Timestamp", "Temperature", "Humidity", "Moisture"])

    # Generate and write 43,200 samples
    last_temp = initial_temp
    last_humidity = initial_humidity
    last_moisture = initial_moisture

    for i in range(num_samples):
        timestamp = start_time + i * interval
        sample = generate_sample(timestamp, last_temp, last_humidity, last_moisture)
        writer.writerow(sample)
        
        # Update last values for next sample
        last_temp, last_humidity, last_moisture = sample[1], sample[2], sample[3]

print(f"Data generation complete. {num_samples} samples saved to plant_data_mimic_user_input.csv.")