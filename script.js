"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const renderContry = function (data, className = "") {
    const [conturyLang] = Object.values(data.languages);
    const currencies = Object.values(data.currencies)[0].name;
    const html = `<article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
                +data.population / 1000000
            ).toFixed(1)} M</p>
            <p class="country__row"><span>🗣️</span>${conturyLang}</p>
            <p class="country__row"><span>💰</span>${currencies}</p>
          </div>
        </article>`;
    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
};
const getPosition = function () {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

const renderError = function (msg) {
    countriesContainer.insertAdjacentText("beforeend", msg);
    countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errMsg = "Something went wrong!") {
    return fetch(url).then((response) => {
        if (!response.ok) throw new Error(`${errMsg}`);
        return response.json();
    });
};

// todo: consuming promises with ASYNC/AWAIT

const whereAmI = async function () {
    try {
        // Geolocation
        const pos = await getPosition();
        const { latitude: lat, longitude: lng } = pos.coords;

        // Reverse Geocoding
        const resGeo = await fetch(
            `https://geocode.xyz/${lat},${lng}?geoit=json`
        );
        if (!resGeo.ok) throw new Error("Problem get location data");
        const dataGeo = await resGeo.json();
        // Country data
        const res = await fetch(
            `https://restcountries.com/v3.1/name/${dataGeo.country}`
        );
        if (!res.ok) throw new Error("Problem getting country data");
        const data = await res.json();
        renderContry(data[1]);
        const neighbour = data[1].borders[0];
        console.log(neighbour);
        if (!neighbour) throw new Error("No neighbour found!");
        const country2 = await fetch(
            `https://restcountries.com/v3.1/alpha/${neighbour}`
        );
        if (!res.ok) throw new Error("Problem getting country data");
        const data2 = await country2.json();
        renderContry(data2[0]);
    } catch (err) {
        renderError(`Something went wrong! ${err.message}`);
    }
};
btn.addEventListener("click", whereAmI);
