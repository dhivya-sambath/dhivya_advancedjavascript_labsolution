const api = { 
    key: "7e3f21edee540e6110af347b55eb1ab2", 
    base: "https://api.openweathermap.org/data/2.5/" 
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress',search);

function search(e){ 
    if(e.keyCode === 13){
        getResults(searchbox.value);
    }
}

function getResults(query){
    const url = `${api.base}weather?q=${query}&appid=${api.key}`;
    fetch(url)
    .then(weather => {
        return weather.json();
    }).then((response) => {
        console.log(response);
        if(response.cod === 200){
            displayResults(response);
        }
        else{
            alert(response.message);
        }
    })
    .catch((err)=>{
        console.log(err);
    })
}

function displayResults(weather){
    let city = document.querySelector('.city');
    city.innerText = `${weather.name},${weather.sys.country}`;

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText =`${Math.round(weather.main.temp_min)}°c/${Math.round(weather.main.temp_max)}°c`

    let now = new Date();
    let date = document.querySelector('.date');
    date.innerText=dateBuilder(now);
}

function dateBuilder(dateObj){
    
     const DATE_FORMAT_OPTIONS = {
        month:'long',
        day:'numeric',
        year:'numeric',
        weekday:'long'
     }

     return dateObj.toLocaleDateString("en-US",DATE_FORMAT_OPTIONS);

}