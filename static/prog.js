let Temperature = document.querySelector(".Temperature-progress");
let TemperatureValueContainer = document.querySelector(".Temperature-value");
let Humidity = document.querySelector(".Humidity-progress");
let HumidityValueContainer = document.querySelector(".Humidity-value");
let Moisture = document.querySelector(".Moisture-progress");
let MoistureValueContainer = document.querySelector(".Moisture-value");
// let blank = document.querySelector(".blank-progress");
// let blankValueContainer = document.querySelector(".blank-value");

let TemperatureValue =80;
let HumidityValue = 60;
let MoistureValue =40;
// let blankValue = 33;

TemperatureValueContainer.textContent = ${TemperatureValue}°C
Temperature.style.background = `conic-gradient(
    #eef3f3 ${TemperatureValue * 3.6}deg,
    #c9c0bb ${TemperatureValue * 3.6}deg
)`
;

HumidityValueContainer.textContent = ${HumidityValue}%
Humidity.style.background = `conic-gradient(
    #eef3f3 ${HumidityValue * 3.6}deg,
    #c9c0bb  ${HumidityValue * 3.6}deg
)`;

MoistureValueContainer.textContent = ${MoistureValue}%
Moisture.style.background = `conic-gradient(
    #eef3f3 ${MoistureValue * 3.6}deg,
    #c9c0bb ${MoistureValue * 3.6}deg
)`;

// blankValueContainer.textContent = ${blankValue}%
// blank.style.background = `conic-gradient(
//     #eef3f3 ${blankValue * 3.6}deg,
//     #c9c0bb ${blankValue * 3.6}deg
// )`;
function temp(){
    let ele=document.querySelector('.Temperature');
    let con=document.querySelector('.Temperature-condition');

    if (TemperatureValue>24){
       ele.style.background = 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(247,87,0,1) 0%, rgba(249,0,0,1) 90.1% )';
       con.textContent="High";
    }
    else if(TemperatureValue<10){
        ele.style.background = 'radial-gradient(at left top, rgba(255, 191, 12, 1.0), rgba(252, 254, 116, 1.0))';
        con.textContent="Low";}
    else{
        ele.style.background= 'radial-gradient(circle farthest-corner at -1% 57.5%, rgba(19,170,82,1) 0%, rgba(0,102,43,1) 90%)';
        con.textContent="Normal"
    }
}
temp();
function hum(){
    let ele=document.querySelector('.Humidity');
    let con=document.querySelector('.Humidity-condition');

    if (HumidityValue>80){
       ele.style.background = 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(247,87,0,1) 0%, rgba(249,0,0,1) 90.1% )';
       con.textContent="High"
    }
    else if(HumidityValue<41){
        ele.style.background = 'radial-gradient(at left top, rgba(255, 191, 12, 1.0), rgba(252, 254, 116, 1.0))';
        con.textContent="Low";}
    else{
        ele.style.background= 'radial-gradient( circle farthest-corner at 30% 20%,  rgb(19, 174, 133) 10%, rgb(6, 89, 91) 90% )';
        con.textContent="Normal"
    }
}
hum();
function moi(){
    let ele=document.querySelector('.Moisture');
    let con=document.querySelector('.Moisture-condition');
    if (MoistureValue>=70){
       ele.style.background = 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(247,87,0,1) 0%, rgba(249,0,0,1) 90.1% )';
       con.textContent="High";
    }
    else if(MoistureValue<20){
        ele.style.background = 'radial-gradient(circle farthest-corner at 30% 20%, rgba(255, 200, 12, 1.0) 0%, rgba(252, 150, 13, 1.0) 80%)';
        con.textContent="Low";
    }
    else{
        ele.style.background= 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(37,145,251,0.98) 0.1%, rgba(0, 6, 128, 0.822) 99.8% )';
        con.textContent="Nornal";
    }
}
moi();