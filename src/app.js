function formatDate(timestamp){
    //calculate the date 
        let now = new Date (timestamp);

       let weekDays = ["Sunday","Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"]
       let day = weekDays[now.getDay()];

       let date = now.getDate();

       let months=["January","February", "March","April","May","June","July", "August","September","October","November","December"];
       let month=months[now.getMonth()];

       let year=now.getFullYear();
       let hours=now.getHours();
       if (hours<10) {
           hours===`0${hours}`
       }
       let minutes=now.getMinutes();
       if (minutes<0) {
           minutes===`0${hours}`
       }    

    return `${day}, ${date} ${month} ${year}, ${hours}:${minutes}` 
}


function displayTemperature(response){
console.log(response.data);
let temperatureElement=document.querySelector("#temperature");
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let windElement=document.querySelector("#wind");
let dateElement=document.querySelector("#date");

temperatureElement.innerHTML= Math.round(response.data.main.temp);
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
humidityElement.innerHTML = response.data.main.humidity;
windElement.innerHTML= Math.round(response.data.wind.speed);
dateElement.innerHTML= formatDate(response.data.dt*1000);

}

function search(city){
    let apiKey = "e9c021b631259222d3dcbc9761c3c90c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);

}

function handleSubmit(event) {
    event.preventDefault()
    let cityInputElement=document.querySelector("#city-input")
    search(cityInputElement.value);

}

search("New york");

let searchFormElement=document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSubmit);