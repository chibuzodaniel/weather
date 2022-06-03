// all necessary elements from dom
const app = docuent.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.getElementById("locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");

// App default city when page loads
let cityInput = "London";

// adding a click event to all city in the panel
cities.forEach((city) => {
  city.addeventListener("click", (e) => {
    //to change from the default city to another city
    cityInput = e.target.innerHTML;
    /* function to fetch and display the datas from weather API */
    fetchWeatherData();
    //this will fade out the simple nanimation
    app.style.opacity = "0";
  });
});
//adding a submit event to the form
form.addEventListener("submit", (e) => {
  /* if the search bar is empty throw alert to input something */
  if (search.value.lenght == 0) {
    alert("please input a city name first");
  } else {
    /* change from from the default city to the written city*/
    cityInput = search.value;
    /* function that displayes datas from Api */
    fetchWeatherData();
    //remove all text from the input field
    search.value = "";
    // fade out the app animation
    app.style.opacity = "0";
  }
  //prevents the default behavior of the form
  e.preventDefault();
});
/* function that returns the day of the week */
function dayOfTheWeek(day, month, year) {
  const weekDay = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  return weekday[new Date("${day}-${month}-${year}").getDay()];
}
//function to fetche and display data from api
function fetchWeatherData() {
  /* fetch data and dynamically add the city name with */
  fetch("http://api.weatherapi.com.com/v1/current.json?key=......=${cityInput");
  /* convert the data in json format to regular js object */
  .then(response => response.json())
  .then(data =>{
   /* console log to see whats available */
   console.log(data);
   /*add the temperature first */
   temp.innerHTML = data.current.temp_c + "&#176;";
   conditionOutput.innerHTML = data.current.condition.text;
   /*get the date and time from the city */
   const date = Date.location.localtime;
   const y = parseInt(date.substr(0.4));
   const m = parseInt(date.substr(5.2));
   const d = parseInt(date.substr(8.2));
   const time = date.substr(11);



  })