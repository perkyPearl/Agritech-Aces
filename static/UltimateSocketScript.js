var user = document.querySelector("#username").textContent;
var socket = io.connect("http://" + document.domain + ":8000/");
console.log(user.textContent);

let Temperature = document.querySelector(".Temperature-progress");
let TemperatureValueContainer = document.querySelector(".Temperature-value");
let Humidity = document.querySelector(".Humidity-progress");
let HumidityValueContainer = document.querySelector(".Humidity-value");
let Moisture = document.querySelector(".Moisture-progress");
let MoistureValueContainer = document.querySelector(".Moisture-value");
let ResultBox = document.querySelector(".result");
let SuggestionBox = document.querySelector(".Suggestion-Box");

let SuggestionsArr = [];

function temp(TemperatureValue) {
  let ele = document.querySelector(".Temperature");
  let con = document.querySelector(".Temperature-condition");

  if (TemperatureValue == -1) {
    SuggestionsArr.push("Temperature Sensor is Offline!");
    ele.style.background =
      "radial-gradient( circle farthest-corner at 10% 20%,  rgba(247,87,0,1) 0%, rgba(249,0,0,1) 90.1% )";
  } else if (TemperatureValue > 24) {
    ele.style.background =
      "radial-gradient( circle farthest-corner at 10% 20%,  rgba(247,87,0,1) 0%, rgba(249,0,0,1) 90.1% )";
    con.textContent = "High";
    SuggestionsArr.push(
      "Temperature is too high, Watering plants might help them to cool them down."
    );
  } else if (TemperatureValue < 10) {
    ele.style.background =
      "radial-gradient(at left top, rgba(255, 191, 12, 1.0), rgba(252, 254, 116, 1.0))";
    con.textContent = "Low";
  } else {
    ele.style.background =
      "radial-gradient(circle farthest-corner at -1% 57.5%, rgba(19,170,82,1) 0%, rgba(0,102,43,1) 90%)";
    con.textContent = "Normal";
  }
}

function humi(HumidityValue) {
  let ele = document.querySelector(".Humidity");
  let con = document.querySelector(".Humidity-condition");

  if (HumidityValue == -1) {
    SuggestionsArr.push("Humidity Sensor is Offline!");
    ele.style.background =
      "radial-gradient( circle farthest-corner at 10% 20%,  rgba(247,87,0,1) 0%, rgba(249,0,0,1) 90.1% )";
  } else if (HumidityValue > 80) {
    ele.style.background =
      "radial-gradient( circle farthest-corner at 10% 20%,  rgba(247,87,0,1) 0%, rgba(249,0,0,1) 90.1% )";
    con.textContent = "High";
  } else if (HumidityValue < 41) {
    ele.style.background =
      "radial-gradient(at left top, rgba(255, 191, 12, 1.0), rgba(252, 254, 116, 1.0))";
    con.textContent = "Low";
  } else {
    ele.style.background =
      "radial-gradient( circle farthest-corner at 30% 20%,  rgb(19, 174, 133) 10%, rgb(6, 89, 91) 90% )";
    con.textContent = "Normal";
  }
}

function moist(MoistureValue) {
  let ele = document.querySelector(".Moisture");
  let con = document.querySelector(".Moisture-condition");

  if (MoistureValue == -1) {
    SuggestionsArr.push("Moisture Sensor is Offline!");
    ele.style.background =
      "radial-gradient( circle farthest-corner at 10% 20%,  rgba(247,87,0,1) 0%, rgba(249,0,0,1) 90.1% )";
  } else if (MoistureValue >= 70) {
    ele.style.background =
      "radial-gradient( circle farthest-corner at 10% 20%,  rgba(247,87,0,1) 0%, rgba(249,0,0,1) 90.1% )";
    con.textContent = "High";
    SuggestionsArr.push(
      "Moisture is too High, Too much water present in the Soil!"
    );
  } else if (MoistureValue < 20) {
    ele.style.background =
      "radial-gradient(circle farthest-corner at 30% 20%, rgba(255, 200, 12, 1.0) 0%, rgba(252, 150, 13, 1.0) 80%)";
    con.textContent = "Low";
    SuggestionsArr.push("Moisture is too Low, Watering the Plants might help.");
  } else {
    ele.style.background =
      "radial-gradient( circle farthest-corner at 10% 20%,  rgba(37,145,251,0.98) 0.1%, rgba(0, 6, 128, 0.822) 99.8% )";
    con.textContent = "Normal";
  }
}

var data = [
  {
    x: ["00:00:00"],
    y: [1],
    type: "scatter",
    color: "rgba(234, 243, 104, 1)",
    name: "Temperature",
    line: {
      color: "#ff1d00",
    },
  },
  {
    x: ["00:00:00"],
    y: [1],
    type: "scatter",
    color: "rgba(255, 0, 0, 1)",
    name: "Humidity",
  },
  {
    x: ["00:00:00"],
    y: [1],
    type: "scatter",
    color: "rgba(0, 0, 255, 1)",
    name: "Moisture",
    line: {
      color: "#354cff",
    },
  },
];

var layout = {
  title: "Real-time Graph Generation",
  yaxis: {
    range: [0, 100],
  },
  height: 400,
  width: 1000,
};

var config = { responsive: true };

Plotly.newPlot("chart", data, layout, config);

socket.on("DataRetrieve", function (data) {
  console.log("Server response:", data);
  if (data["user"] == user) {
    data = data["data"];
    let TemperatureValue = data[1];
    let HumidityValue = data[2];
    let MoistureValue = data[3];
    temp(TemperatureValue);
    humi(HumidityValue);
    moist(MoistureValue);
    if (TemperatureValue == -1) {
      SuggestionsArr.push("System Seems Offline");
    }
    TemperatureValueContainer.textContent = `${TemperatureValue}°C`;
    Temperature.style.background = `conic-gradient(
      #eef3f3 ${TemperatureValue * 3.6}deg,
      #c9c0bb ${TemperatureValue * 3.6}deg
      )`;

    HumidityValueContainer.textContent = `${HumidityValue}%`;
    Humidity.style.background = `conic-gradient(
      #eef3f3 ${HumidityValue * 3.6}deg,
      #c9c0bb  ${HumidityValue * 3.6}deg
      )`;

    MoistureValueContainer.textContent = `${MoistureValue}%`;
    Moisture.style.background = `conic-gradient(
          #eef3f3 ${MoistureValue * 3.6}deg,
          #c9c0bb ${MoistureValue * 3.6}deg
          )`;
    Plotly.extendTraces(
      "chart",
      {
        x: [[data[0]], [data[0]], [data[0]]],
        y: [[TemperatureValue], [HumidityValue], [MoistureValue]],
      },
      [0, 1, 2]
    );
  }
});

function updateSuggestions(newSuggestions) {
  const suggestionContainer = document.querySelector(".Suggestion-Box");

  const suggestionList = Array.from(
    suggestionContainer.getElementsByTagName("li")
  );

  suggestionList.forEach((suggestion) => {
    const suggestionText = suggestion.textContent.trim();
    if (!newSuggestions.includes(suggestionText)) {
      suggestion.style.opacity = 0; // Fade out
      setTimeout(() => {
        suggestion.remove();
      }, 500);
    }
  });

  newSuggestions.forEach((suggestion) => {
    if (
      !suggestionList.some(
        (existingSuggestion) =>
          existingSuggestion.textContent.trim() === suggestion
      )
    ) {
      const newSuggestion = document.createElement("li");
      newSuggestion.textContent = suggestion;
      suggestionContainer.appendChild(newSuggestion);

      void newSuggestion.offsetWidth;
      newSuggestion.style.opacity = 1; // Fade in
    }
  });
}

let retriever;

function fetchRealtimeData() {
  socket.on("connect", function () {
    console.log("Connected!");
  });

  console.log("Fetching Realtime Data");
  let count = 0;
  retriever = setInterval(() => {
    socket.emit("fetchData");
    if (count == 5) {
      updateSuggestions(SuggestionsArr);
      console.log(SuggestionsArr);
      SuggestionsArr.length = 0;
      count = 0;
    }
    count++;
  }, 1000);
}

let FetchButton = document.querySelector(".fetchButton");
state = 1;

FetchButton.addEventListener("click", () => {
  if (state == 1) {
    state = 0;
    FetchButton.textContent = "Stop Fetching Data"
    FetchButton.classList.add("Stop")
    fetchRealtimeData();
  } else {
    FetchButton.textContent = "Fetch Real-time Data"
    FetchButton.classList.remove("Stop")
    clearInterval(retriever);
    state = 1;
  }
});