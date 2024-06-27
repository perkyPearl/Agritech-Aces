import csv
import random
import time
import os
from datetime import datetime

userId = "test"

def writeData(t,h,m):
    while True:
        try:
            csv_filepath = os.getcwd() + f'\\DataBase\\{userId}\\'+str(datetime.today().date())+'.csv'  
            temp = t
            humidity = h
            moist = m

            timestamp = time.strftime('%Y-%d-%m %H:%M:%S')

            with open(csv_filepath,'a',newline='') as csv_file:
                csv_writer=csv.writer(csv_file)
                csv_writer.writerow([timestamp,temp,humidity,moist])
                print(f"{timestamp}: {temp,humidity,moist}")
            time.sleep(1)    

        except Exception as e:
            print(e)

if __name__ == "__main__":
    writeData(25,20,80)