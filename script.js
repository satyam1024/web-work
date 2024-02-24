var container =document.querySelector("#weather-data")
var body=document.querySelector(".container")
var apikey="752cb281643ea837ef32bfb8d69170fe";

document.getElementById('location-form').addEventListener('submit',function(event){
  event.preventDefault();
  var location = document.getElementById('location-input').value;
  
  getWeather(location);
  document.getElementById('location-input').value="";
  console.log("now");
});

async function getWeather(location) {
  console.log("ok");
  console.log(location);

  try {
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apikey + "&units=metric");
    
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    body.className="container";

    const data = await response.json();
    console.log(data);
    var weather =data.weather[0].main;
    console.log(weather);
    if(weather.toLowerCase().includes("cloud") ){
      console.log("ok");
      body.classList.add("con-color1");
    }
    else if(weather.toLowerCase().includes("rain") ){
      console.log("ok");
      body.classList.add("con-color2");
    }
    else if(weather.toLowerCase().includes("clear") ){
      console.log("ok");
      body.classList.add("con-color3");
    }
    else {
      console.log("ok");
      body.classList.add("con-color4");
    }
    var name= data.name;
    var temp= data.main.temp;
    var icon= data.weather[0].icon;
    console.log(icon);
    var iconurl= "https://openweathermap.org/img/wn/"+icon+"@2x.png";
    console.log(weather+"  "+temp+"  "+name);
    container.innerHTML = `
              <div class="data">
                <div class="name">
                  ${name}
                </div>
                <div class="weather-data">
                <div class="icon">
                <img src= ${iconurl} alt="icon">
                </div>
                <div class="weather">
                  <p>${weather}</p>
                  <p>${temp}°C</p>
              </div>
            </div>
 
              </div>
          `;

  } catch (error) {
    console.error(error.message);
    container.innerHTML=`
    <div class="error">
      Error: City not found
    </div>
    `
  }
}

