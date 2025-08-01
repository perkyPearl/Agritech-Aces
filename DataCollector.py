import serial
import csv
import time
from datetime import datetime
import os

userId = input("User: ")

csv_filepath = os.getcwd() + "\\DataBase\\" + userId + "\\" + str(datetime.today().date()) + '.csv'

ser = serial.Serial('COM5', 9600, serial.EIGHTBITS)
try:
    while True:
        try:
            line = ser.readline().decode("utf-8").rstrip()

            if line:
                data = line.split()

                if len(data) == 3:
                    item1 = data[0]
                    item2 = data[1]
                    item3 = data[2]

                    timestamp = time.strftime('%Y-%d-%m %H:%M:%S')
                    
                    with open(csv_filepath, 'a', newline='') as csv_file:
                        csv_writer = csv.writer(csv_file)
                        csv_writer.writerow([timestamp, item1, item2, item3])
                    
                    print(f"{timestamp}: Item1: {item1}, Item2: {item2}, Item3: {item3}")
                        
                time.sleep(1)

        except Exception as e:
            print(e)

finally:
    if ser.is_open:
        ser.close()