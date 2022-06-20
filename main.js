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
  fetch(
    "http://api.weatherapi.com.com/v1/current.json?key=bcd29a26471b4b64a9690018221606=${cityInput}"
  )
    /* convert the data in json format to regular js object */
    .then((response) => response.json())
    .then((data) => {
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

      //formating of the date into a different style
      dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)}${d},${t},${y}`;
      timeOutput.innerHTML = time;

      //add the name of the city into the page.
      nameOutput.innerHTML = data.location.name;

      //extract the weather icons
      const iconId = data.current.condition.icon.substr(
        "//cdn.weatherapi.com/weather/64*64/".lenght
      );

      // reformatting the icon to my local folder, so as to add to the page
      icon.src = "./icons/" + iconId;

      // adding the wether details to the page

      cloudOutput.innerHTML = data.current.cloud + "%";
      humidityOutput.innerHTML = data.current.humidity + "%";
      windOutput.innerHTML = data.current.wind + "km/h";

      //setting default time of the day

      let timeOfTheDay = "day";

      //to get a unique id for different weather condition;
      const code = data.current.condition.code;

      //change to night mode once the city is night time

      if (!data.current.is_day) {
        timeOfTheDay = "night";
      }
      if (code == 1000) {
        //change the background img to clear
        app.style.backgroundImage = `url(./images/${timeOfTheDay}/clear.jpg)`;
        //changing the search btn depending on if night or day

        btn.style.background = "#e5ba92";
        if (timeOfTheDay == "night") {
          btn.style.background = "#181e27";
        }
      }
      //do thesame thing for cloudy weather
      else if (
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1273 ||
        code == 1276 ||
        code == 1279 ||
        code == 1282
      ) {
        app.style.backgroundImage = `url(./images/${timeOfTheDay}/rainy.jpg)`;
        btn.style.background = "#647d75";
        if (timeOfTheDay == "night") {
          btn.style.background = "#325c80";
        }
        //and for the snow
      } else {
        app.style.backgroundImage = `url("./images/${timeOfTheDay}/snowy.jpg)`;
        btn.style.background = "#4d72aa";
        if (timeOfTheDay == "night") {
          btn.style.background = "#1b1b1b";
        }
      }
      //fade in out stuff
      app.style.opacity = "1";
    })
    //throw an alert if the state does not exist
    .catch(() => {
      alert("city not found in pure weather, please try again");
      app.style.opacity = "1";
    });
}
//call the function for page load
fetchWeatherData();
//to fade into the page
app.style.opacity = "1";
