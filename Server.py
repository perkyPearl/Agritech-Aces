from flask import Flask, render_template, request, session, redirect, url_for, jsonify
from flask_socketio import SocketIO, emit
from datetime import timedelta
from flask_cors import CORS
from datetime import datetime
from pymongo import MongoClient
from flask_pymongo import PyMongo
import MongoStuff
import os
import socket
import csv

host = socket.gethostbyname(socket.gethostname())

path = os.getcwd() + "\\DataBase\\"
class Database:
    def createUser(user):
        if user not in os.listdir(path):
            os.mkdir(os.path.join(path,user)) 

    def getRealtimeData(user):
        current_date_time = datetime.now()
        formatted_date = current_date_time.strftime('%Y-%m-%d')
        with open(path+ user + "\\" + formatted_date + ".csv", 'r') as file:
            reader = csv.reader(file)
            last_entry = None
            for row in reader:
                last_entry = row
        return {"user":user,"data":last_entry}

    def listData(user):
        return os.listdir(path+user)
    
    def DatabyDate(date,user):
        with open(path + user + "\\" + date, 'r') as file:
            reader = csv.reader(file)
            timings = []
            temp = []
            humidity = []
            moisture = []

            for row in reader:
                timings.append(row[0])
                temp.append(int(row[1]))
                humidity.append(int(row[2]))
                moisture.append(int(row[3]))
            
            ReadingsNeeded = 24

            DataPacket = {
                "Date" : date,
                "Timings": timings[::len(timings)//ReadingsNeeded],
                "temp" : temp[::len(temp)//ReadingsNeeded],
                "humidity" : humidity[::len(humidity)//ReadingsNeeded],
                "moisture" : moisture[::len(moisture)//ReadingsNeeded],
                "AvgData1": int(sum(temp)/len(temp)) if len(temp) != 0 else -1,
                "AvgData2" : int(sum(humidity)/len(humidity)) if len(humidity) != 0 else -1,
                "AvgData3" : int(sum(moisture)/len(moisture)) if len(moisture) != 0 else -1
            }
        return DataPacket

# Server Configurations
app = Flask(__name__)
app.secret_key = "AgritechAces"
app.permanent_session_lifetime = timedelta(days=5)
CORS(app)
socket = SocketIO(app, cors_allowed_origins="*") 

# MongoDB Database
client = MongoClient(MongoStuff.uri)
db = client['AgritechAcesDatabase']
collection = db['UserData']

@app.route('/')
def home():
    app.config["MONGO_URI"] = MongoStuff.uri
    mongo = PyMongo(app)
    if "user" in session:
        user = session["user"]
        method = "logout"
    else:
        user = "Login/Signup"
        method = "login"    
    return render_template("index.html",user=user,method=method)

@socket.on("connect")
def connected():
    print("User Connected")

@app.route("/login",methods=["POST","GET"])
def login():
    if request.method == "POST":
        session.permanent = True
        user = request.form["username"]
        password = request.form["password"]
        info = collection.find_one({"username":user})

        if info:
            if info["password"] == password:
                session["user"] = user
                Database.createUser(user)
                return redirect(url_for("user"))
            else:
                return render_template("login.html",username=user,password=password,isVerified=["","error"])
        else:
            return render_template("login.html",username=user,password=password,isVerified=["error",""])
    else:
        if "user" in session:
            user = session["user"]
            return redirect(url_for("/userDashboard"))
        else:
            return render_template("login.html",username="",password="",isVerified=["",""])

@app.route("/signup",methods=["POST","GET"])
def Signup():
    if request.method == 'POST':
        first_name = request.form['firstname']
        last_name = request.form['lastname']
        email = request.form['email']
        phone_number = request.form['phoneNumber']
        username = request.form['username']
        password = request.form['password']

        user_data = {
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'phone_number': phone_number,
            'username': username,
            'password': password
        }
        res = collection.insert_one(user_data).acknowledged
        if res:
            Database.createUser(username)
            return redirect(url_for('login'))
        else:
            return redirect(url_for('Signup'))
    else:
        return render_template("signup.html")

@app.route("/userDashboard")
def user():
    if "user" in session:
        user = session["user"]
        return render_template("dashboard.html",user=user)
    else:
        return redirect(url_for("login"))

@app.route('/history')
def history():
    user = session["user"]
    data = Database.listData(user)
    return render_template("prevTable.html",Data=data,n=len(data),user=user)

@app.route("/<date>")
def PrevData(date):
    user = session["user"]
    return render_template("prevDashboard.html",user=user,data=Database.DatabyDate(date,user),date=date.split(".")[0])

@socket.on('fetchData')
def RealtimeData():
    user = session["user"]
    data = Database.getRealtimeData(user)
    socket.emit('DataRetrieve',data);

@app.route("/logout")
def logout():
    session.pop("user", None)
    return redirect(url_for("home"))

if __name__ == "__main__":
    socket.run(app,host=host,debug=True,port=8000)