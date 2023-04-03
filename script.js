"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////
//* old way xml request handling
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     const [contury] = Object.values(data.languages);
//     const cur = Object.values(data.currencies)[0].name;
//     //   console.log(data.currencies);
//     const html = `<article class="country">
//           <img class="country__img" src="${data.flags.png}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name.common}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)} M</p>
//             <p class="country__row"><span>🗣️</span>${contury}</p>
//             <p class="country__row"><span>💰</span>${cur}</p>
//           </div>
//         </article>`;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };
// getCountryData('bharat');
// getCountryData('usa');

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
/*
const getCountryAndNeighbour = function (country) {
  // ajax call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    //   render country 1
    renderContry(data);

    //   get neighbour country
    const [neighbour] = data.borders;
    if (!neighbour) return;
    // todo: call back hell

    // ajax call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);

      renderContry(data2, 'neighbour');
    });
  });
};
getCountryAndNeighbour('usa');
 */

// todo: Promises & fetch api
// modern way to get data from api

// const request = fetch(`https://restcountries.com/v3.1/name/bharat`);
// console.log(request);

// todo: Consume Promises

// const getCountryData1 = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`) //returns Promises
//     .then(function (response) {
//       console.log(response);
//       return response.json(); //returns Promises
//     })
//     .then(function (data) {
//         console.log(data);
//         renderCountry(data[ 0 ]);
//     });
// };
// getCountryData1('bharat');

// todo: Chain Promises

const getCountryData = function (country) {
    // country 1
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            renderContry(data[0]);
            const neighbour = data[0].borders[0];
            if (!neighbour) return;

            // country 2
            return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
        })
        .then((response) => response.json())
        .then((data) => renderContry(data[0], "neighbour"));
};
getCountryData("bharat");

// todo: practice
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       renderContry(data[0]);
//       const neighbour = data[0].borders[0];
//       if (!neighbour) return;

//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => {
//       renderContry(data[0], 'neighbour');
//     });
// };
// getCountryData('bharat');
