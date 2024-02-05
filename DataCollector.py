import serial
import csv
import time
from datetime import datetime
import os

userId = "pearl"

csv_filepath = os.getcwd() + "\\DataBase\\" + userId + "\\" + str(datetime.today().date()) + '.csv'

ser = serial.Serial('COM3', 9600, serial.EIGHTBITS)

while True:
    try:
        data = float(ser.readline().decode("utf-8"))
        timestamp = time.strftime('%Y-%d-%m %H:%M:%S')

        data = 100 - abs(((data - 350)/(350-750))*100)

        if data > 100:
            data = 100
        if data < 0:
            data = 0

        with open(csv_filepath, 'a', newline='') as csv_file:
            csv_writer = csv.writer(csv_file)
            csv_writer.writerow([timestamp, data])
            print(f"{timestamp}: {data}")

        time.sleep(.001)

    except Exception as e:
        print(e)