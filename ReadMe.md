# 🌱 Agritech Aces – Smart Soil Nutrient Monitoring System

A real-time IoT-based soil analysis system designed to empower farmers with actionable insights into soil conditions, crop suitability, and fertilization needs.

---

## 🚀 Features

* 🔍 Real-time monitoring of **temperature**, **humidity**, and **soil moisture** via Arduino sensors
* 🔌 Data transfer via **Serial Port Communication** (not BLE)
* 📈 Live visualizations using **Plotly.js** (radial dials + graphs)
* 📊 Daily logs stored as **CSV** for historical trend analysis
* 🌾 NPK estimation + **fertilizer recommendations** based on crop selection
* 🤖 Integration with **Gemini AI** for soil optimization suggestions
* 📱 Mobile-responsive and user-friendly web UI
* 🧠 Modular Python backend with Flask, WebSocket, and MongoDB
* 📁 Historical reports (daily, weekly, monthly) automatically generated
* 🔄 Crop comparison tool to evaluate soil compatibility
* 🔒 Secure data handling with basic encryption and user-specific routing

---

## 🛠 Tech Stack

* **Frontend**: HTML, CSS, JavaScript, Plotly.js
* **Backend**: Python, Flask, WebSocket, MongoDB
* **Hardware**: Arduino UNO, DHT11, Soil Moisture Sensor
* **Data Logging**: CSV (structured for ML-ready preprocessing)
* **Communication**: Serial Port (PySerial)
* **AI**: Gemini API integration for dynamic suggestions

---

## 📂 Project Structure

```
├── static/                 # Frontend assets (CSS/JS)
├── templates/              # HTML templates for Flask
├── DataCollector.py        # Reads serial data from Arduino
├── DummyDataGenerator.py   # For testing without hardware
├── MongoStuff.py           # MongoDB data handling
├── Server.py               # Main Flask server
├── Socket.py               # WebSocket integration
├── requirements.txt        # Dependencies
└── README.md               # You're here!
```

---

## 📸 Dashboard Preview

> *(Insert dashboard or UI screenshots here)*
> Live graphs, radial dials for soil parameters, crop-specific recommendations, and historical visual trends.

---

## 🧪 How to Run

1. Connect Arduino with sensors to your system
2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```
3. Start the Flask + WebSocket server:

   ```bash
   python Server.py
   ```
4. Start the data collector:

   ```bash
   python DataCollector.py
   ```
5. Visit `localhost:5000` in your browser

---

## 📈 Data Flow Overview

1. **Sensor Readings** → Soil Moisture, Temperature, Humidity
2. **Data Collector (Serial)** → Reads & stores in CSV
3. **Flask Server** → Processes data, serves to WebSocket
4. **WebSocket** → Pushes to frontend in real-time
5. **Frontend (Plotly.js)** → Live visualization + insights
6. **Gemini API** → Suggests optimal farming actions

---

## 🧠 Future Enhancements

* ML-based soil behavior prediction
* Automatic irrigation trigger support
* Weather API integration
* SMS alerts
* Multilingual support for broader reach
* User authentication and dashboard customization

---

## 👤 Author

Made with ❤️ by [perkyPearl](https://github.com/perkyPearl)

---

## 📄 License

This project is open-source under the MIT License.
