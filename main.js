const api ={
    key: "4a3ba55f2243fc850c77bb4c99748a1f",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt){
    if (evt.keyCode == 13){
        getResults(searchbox.value);
    }
}

function getResults (query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayresults);
}

function displayresults (weather){
    console.log(weather);


    let city = document.querySelector('.city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    if(weather.name==undefined){
        document.getElementById("undcity").innerHTML = "New text!";
    }

    let now = new Date();
    let date = document.querySelector('.date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.weather');
    weather_el.innerText = weather.weather[0].main;

    if (weather.weather[0].main == "Clouds"){
        document.body.style.backgroundImage = "url('clouds.jpg')";
    }
    if (weather.weather[0].main == "Sunny"){
        document.body.style.backgroundImage = "url('sunny.jpg')";
    }
    if (weather.weather[0].main == "Rain"){
        document.body.style.backgroundImage = "url('rainy.jpg')";
    }
    
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
;}

function dateBuilder(d){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sun","Mon","Tues","Wed","thurs","Fri","Sat"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}