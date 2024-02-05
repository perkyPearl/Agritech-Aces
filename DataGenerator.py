import csv
import datetime
import random

def write_to_csv(filename, custom_date):
    with open(filename, mode='w', newline='') as file:
        writer = csv.writer(file)

        start_time = datetime.datetime.strptime(f"{custom_date} 00:00:00", "%Y-%m-%d %H:%M:%S")
        end_time = datetime.datetime.strptime(f"{custom_date} 23:59:59", "%Y-%m-%d %H:%M:%S")

        current_time = start_time
        while current_time <= end_time:
            timestamp = current_time.strftime("%Y-%m-%d %H:%M:%S")
            temp = random.randint(10, 25)
            humidity = random.randint(40, 90)
            moisture = random.randint(10, 99)
            writer.writerow([timestamp, temp, humidity, moisture])
            current_time += datetime.timedelta(seconds=1)

custom_date = "2024-01-25"
filename = f"{custom_date}.csv"

write_to_csv(filename, custom_date)
