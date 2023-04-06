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

        return `You are in ${dataGeo.city}, ${dataGeo.country}`;
    } catch (err) {
        renderError(`Something went wrong! ${err.message}`);
    }
};

// todo: Returning values from Async functions

// const city = whereAmI();
// whereAmI()
//     .then((city) => console.log(`2: ${city}`))
//     .catch((err) => console.log(`2: ${err}`))
//     .finally(() => console.log("3: Finished geting location"));

// console.log("1: Getting location");
// // Immidetly invocked function
// (async function () {
//     try {
//         const city = await whereAmI();
//         console.log(`2: ${city}`);
//     } catch (err) {
//         console.log(`2: ${err}`);
//     }
//     console.log("3: Finished geting location");
// })();

// todo: running the promises prallel

// const get3Countries = async function (c1, c2, c3) {
//     try {
//         // const [dataC1] = await getJSON(
//         //     `https://restcountries.com/v3.1/name/${c1}`
//         // );
//         // const [dataC2] = await getJSON(
//         //     `https://restcountries.com/v3.1/name/${c2}`
//         // );
//         // const [dataC3] = await getJSON(
//         //     `https://restcountries.com/v3.1/name/${c3}`
//         // );

//         //!Promise.all
//         // short circuits when 1 promise rejected
//         const data = await Promise.all([
//             getJSON(`https://restcountries.com/v3.1/name/${c1}`),
//             getJSON(`https://restcountries.com/v3.1/name/${c2}`),
//             getJSON(`https://restcountries.com/v3.1/name/${c3}`),
//         ]);
//         const dataArr = data.map((data) => data[0].capital);
//         console.log(dataArr.flat());
//     } catch (error) {
//         console.log(error.message);
//     }
// };

// get3Countries("bharat", "usa", "uk");

//!Promises.race
(async function () {
    // get only 1 result
    //  rejected value will always will the race result
    const res = await Promise.race([
        getJSON(`https://restcountries.com/v3.1/name/italy`),
        getJSON(`https://restcountries.com/v3.1/name/egypt`),
        getJSON(`https://restcountries.com/v3.1/name/mexico`),
    ]);
    console.log(res[0].capital);
})();

const timeout = function (sec) {
    return new Promise((_, reject) => {
        setTimeout(function () {
            reject(new Error("Request took too long"));
        }, sec * 1000);
    });
};

Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/bharat`),
    timeout(1),
])
    .then((data) => console.log(data[0].capital))
    .catch((err) => console.log(err));
