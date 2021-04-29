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
           hours===`0${hours}`;
       }
       let minutes=now.getMinutes();
       if (minutes<0) {
           minutes===`0${hours}`
       }    

      return `${day}, ${date} ${month} ${year}, ${hours}:${minutes}` 
}

function formatDay(timestamp){
  let date = new Date(timestamp*1000);
  let day = date.getDay();
  let days = ["Sun","Mon", "Tue","Wed","Thu","Fri","Sat"]
  return days[day];
}



function formatHour(timestamp) {
  let date = new Date (timestamp*1000);
  let hour = date.getHours();
  if (hour<10) { 
  hour===`0${hour}:00`;
  }
  return `${hour}:00`;  

}
//1 create a function responsible for displaying hourly weather 
//2 select html element to disply hourly weather 
//3 create empty variable that will hold html code 
//4 place html code in new variable  
//5 create an array with hours you want to loop through 
//6 loop through the arrey with for each function; and place the hourlyWeatherElementHTML is sent to function(hour)
//7create variable to hold API response data


function displayHourlyWeather(response){

  let hourlyWeather = response.data.hourly;
 
  let hourlyWeatherElement = document.querySelector("#hourly-weather")

  let hourlyWeatherElementHTML ="";

  hourlyWeather.forEach(function(hourly,index) {
    
  if (index===0 || index===4 || index===8 || index===12 || index===16 || index===20) {
    hourlyWeatherElementHTML =  hourlyWeatherElementHTML + `
    <div class="byHour col-2 border-end-1 " align="center">
        <ul class="list-unstyled ">
          <li class=" hour " 
          id="hour">
          ${formatHour(hourly.dt)}     
          </li>
           
          <li>
          <img src="http://openweathermap.org/img/wn/${hourly.weather[0].icon}@2x.png" 
                alt="" 
                class="float-left d-inline"
                id = "small-icon"        
                width ="42px"
              />
            </li>
          <li class=" py-1 hourlyTemp" >
          <span>${Math.round(hourly.temp)}</span>℃</li>
          <li class=" py-2 "> 🌬️  <span style="font-size:16px">${Math.round(hourly.wind_speed)} </span>m/s</li>
          
        </ul>  
      </div>
      `}        
  })
  
// 4 assign value to element 
  hourlyWeatherElement.innerHTML=hourlyWeatherElementHTML;  
}

function displayForecast(response){
    
    let forecast = response.data.daily

    let forecastElement=document.querySelector("#forecast");

    let forecastHTML="";

    forecast.forEach(function(forecastDay, index) {
      if (index<6) {
      forecastHTML= forecastHTML+
     `       
            <div class="forecast-column col-2 p-0"align="center">
              <div class="forecast-day">
                ${formatDay(forecastDay.dt)}
              </div>
              <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
                alt="" 
                class="float-left d-inline"
                id = "main-icon"        
                width ="60px"
              />     
              <div class="weather-forecast-temperatures mb-2">
                <span class="weather-forecast-temperature-max">
                  ${Math.round(forecastDay.temp.max)}º
                </span>
                <span class="weather-forecast-temperature-min">
                  ${Math.round(forecastDay.temp.min)}º
                </span>          
              </div> 
            </div>  
         `; 
         }

    })
    
    forecastElement.innerHTML=forecastHTML;

}

function getCoordinates(coordinates){
  
  let apiKey = "e9c021b631259222d3dcbc9761c3c90c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  axios.get(apiUrl).then(displayHourlyWeather);

}

function displayTemperature(response){
let temperatureElement=document.querySelector("#temperature");
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let windElement=document.querySelector("#wind");
let dateElement=document.querySelector("#date");
let mainIconElement=document.querySelector("#main-icon");


temperatureElement.innerHTML= Math.round(response.data.main.temp);
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
humidityElement.innerHTML = response.data.main.humidity;
windElement.innerHTML= Math.round(response.data.wind.speed);

dateElement.innerHTML= formatDate(response.data.dt*1000);
mainIconElement.setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
mainIconElement.setAttribute("alt", response.data.weather[0].description);

celciusTemperature = Math.round(response.data.main.temp);

getCoordinates (response.data.coord);

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

function dispalyCelsiusTemperature(event){
     event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    farenheitLinkElement.classList.remove("active");
    celciusLinkElement.classList.add("active");
    temperatureElement.innerHTML = celciusTemperature;

}

function dispalyFarenheitTemperature(event) {
    event.preventDefault();
    let farenheitTemperatureValue= Math.round((8 * 9/5) + 32 );
    //remove active link to celsius link 
    celciusLinkElement.classList.remove("active");
    farenheitLinkElement.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = farenheitTemperatureValue;
}


function retrieveCurrentLocation(position){
    // Storing Longitude and Latitude in variables
      let long = position.coords.longitude;
      let lat = position.coords.latitude;
      let units = "metric"
      let apiKey = "e9c021b631259222d3dcbc9761c3c90c";
      let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`;
      axios.get(apiURL).then(displayTemperature);
}

navigator.geolocation.getCurrentPosition(retrieveCurrentLocation);


let celciusTemperature = null

let searchFormElement=document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSubmit);

let farenheitLinkElement=document.querySelector("#farenheit-link");
farenheitLinkElement.addEventListener("click", dispalyFarenheitTemperature);

let celciusLinkElement=document.querySelector("#celcius-link");
celciusLinkElement.addEventListener("click", dispalyCelsiusTemperature);



  

