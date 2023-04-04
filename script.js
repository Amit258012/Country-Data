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
    // countriesContainer.style.opacity = 1;
};

const getCountry = function (country) {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then((response) => response.json())
        .then((data) => renderContry(data));
};

const renderError = function (msg) {
    countriesContainer.insertAdjacentText("beforeend", msg);
    // countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errMsg = "Something went wrong!") {
    return fetch(url).then((response) => {
        console.log("1");
        if (!response.ok) throw new Error(`${errMsg}`);
        return response.json();
    });
};

const getCountryData1 = function (country) {
    getJSON(
        `https://restcountries.com/v3.1/name/${country}`,
        `Country not found)`
    )
        .then((data) => {
            // it will call itself when Promisesis fullfilled
            console.log(data);
            renderContry(data[0]);
            const neighbour = data[0].borders[0];
            if (!neighbour) throw new Error("No neighbour found!");

            // country 2
            return getJSON(
                `https://restcountries.com/v3.1/alpha/${neighbour}`,
                `Country not found)`
            );
        })
        .then((data) => renderContry(data[0], "neighbour"))
        .catch((err) => {
            // it returns Promise
            // it will call itself when Promisesis rejected
            console.log(`${err}`);
            renderError(`Somting went wrong : ${err.message}.\nTry again`);
        })
        .finally(() => {
            // it will call itself always
            countriesContainer.style.opacity = 1;
        }); //catching error globally : always add it to last chain
};
btn.addEventListener("click", function () {
    getCountryData1("bharat");
});
