const getCountryAndNeighbour = function (country) {
    // ajax call country 1
    const request = new XMLHttpRequest();
    request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
    request.send();

    request.addEventListener("load", function () {
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
        request2.open(
            "GET",
            `https://restcountries.com/v3.1/alpha/${neighbour}`
        );
        request2.send();

        request2.addEventListener("load", function () {
            const [data2] = JSON.parse(this.responseText);
            console.log(data2);

            renderContry(data2, "neighbour");
        });
    });
};
getCountryAndNeighbour("usa");

// todo: Promises & fetch api
// modern way to get data from api

const request = fetch(`https://restcountries.com/v3.1/name/bharat`);
console.log(request);

// todo: Consume Promises

const getCountryData1 = function (country) {
    fetch(`https://restcountries.com/v3.1/name/${country}`) //returns Promises
        .then(function (response) {
            console.log(response);
            return response.json(); //returns Promises
        })
        .then(function (data) {
            console.log(data);
            renderCountry(data[0]);
        });
};
getCountryData1("bharat");

// todo: Chain Promises

// const getCountryData1 = function (country) {
//     // country 1
//     fetch(`https://restcountries.com/v3.1/name/${country}`)
//         .then((response) => {
//             console.log(response);
//             if (!response.ok)
//                 throw new Error(`Country not found (${response.status})`);

//             // getCountryData1("hdsdgd"); for this call the error handled
//             return response.json();
//         }) // happen when successful
//         .then((data) => {
//             // it will call itself when Promisesis fullfilled
//             console.log(data);
//             renderContry(data[0]);
//             const neighbour = data[0].borders[0];
//             if (!neighbour) return;

//             // country 2
//             return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//         })
//         .then((response) => response.json())
//         .then((data) => renderContry(data[0], "neighbour"))
//         .catch((err) => {
//             // it returns Promise
//             // it will call itself when Promisesis rejected
//             console.log(`${err}`);
//             renderError(`Somting went wrong : ${err.message}.\nTry again`);
//         })
//         .finally(() => {
//             // it will call itself always
//             countriesContainer.style.opacity = 1;
//         }); //catching error globally : always add it to last chain
// };
// btn.addEventListener("click", function () {
//     getCountryData1("bharat");
// });

// todo: practice
// const getCountryData1 = function (country) {
//     fetch(`https://restcountries.com/v3.1/name/${country}`)
//         .then((response) => response.json())
//         .then((data) => {
//             console.log(data);
//             renderContry(data[0]);
//             const neighbour = data[0].borders[0];
//             if (!neighbour) return;

//             return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//         })
//         .then((response) => response.json())
//         .then((data) => {
//             renderContry(data[0], "neighbour");
//         });
// };
// getCountryData1("bharat");

// todo: handling error (rejected Promises)
// fetch shows error only due to internet connection

// todo: challenge #1
const whereAmI = function (lat, lag) {
    fetch(`https://geocode.xyz/${lat},${lag}?geoit=json`)
        .then((response) => {
            if (!response.ok)
                throw new Error(`Problem with geocoding ${response.status}`);
            return response.json();
        })
        .then((data) => {
            console.log(data);
            console.log(`"You are in ${data.city} , ${data.country}"`);

            return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
        })
        .then((response) => {
            if (!response.ok)
                throw new Error(`Country not found (${response.status})`);
            return response.json();
        })
        .then((data) => renderContry(data[0]))
        .catch((error) => {
            console.error(error);
            renderError(`Something went wrong: ${error.message}`);
        })
        .finally(() => {
            countriesContainer.style.opacity = 1;
        });
};
// btn.addEventListener("click", function () {
whereAmI(19.037, 72.873);
whereAmI(52.507, 13.38);
// whereAmI(19.037, 72.873);
// });

// todo: The event loop in practice

// console.log("Test start"); //1
// setTimeout(() => console.log("0 sec timer"), 0); //4
// Promise.resolve("Relsoved promise 1").then((res) => console.log(res)); //3
// console.log("Test end"); //2

// todo: building promise

const po = new Promise((resolve, reject) => {
    console.log("welcome");
    if (Math.random() >= 0.5) {
        resolve("victory");
    } else {
        reject(new Error("defeted"));
    }
});

//  consuming promise
po.then((res) => console.log(res)).catch((err) => console.log(err));

// todo: create Promises(another example)

const lotteryPromise = new Promise(function (resolve, reject) {
    console.log("Lottery game");
    setTimeout(() => {
        if (Math.random() >= 0.5) {
            resolve("You win the lottery"); // for resolve
        } else {
            reject(new Error("You lost your money")); //for rejection
        }
    }, 2000);
});

// consuming Promise
lotteryPromise
    .then((resolve) => console.log(resolve))
    .catch((err) => console.log(err));

// * always executes first
// Promise.resolve("Hi").then((res) => console.log(res));
// Promise.reject("Bye").catch((err) => console.log(err));

// Promisifying setTimeout
const wait = function (seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

wait(1)
    .then(() => {
        console.log("1 sec passed");
        return wait(1);
    })
    .then(() => {
        console.log("2 sec passed");
        return wait(1);
    })
    .then(() => {
        console.log("3 sec passed");
        return wait(1);
    })
    .then(() => {
        console.log("4 sec passed");
        return wait(1);
    })
    .then(() => console.log("5 sec passed"));

// todo: challange #2

const imgContainer = document.querySelector(".images");

const wait1 = function (seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

const createImage = function (imgPath) {
    return new Promise(function (resolve, reject) {
        const img = document.createElement("img");
        img.src = imgPath;

        img.addEventListener("load", function () {
            imgContainer.append(img);
            resolve(img);
        });
        img.addEventListener("error", function () {
            reject(new Error("Image not found"));
        });
    });
};
let curImg;
createImage("img/img-1.jpg")
    .then((img) => {
        curImg = img;
        console.log("Image 1 loaded");
        return wait(2);
    })
    .then(() => {
        curImg.style.display = "none";
        return createImage("img/img-2.jpg");
    })
    .then((img) => {
        curImg = img;
        console.log("Image 2 loaded");
        return wait(2);
    })
    .then(() => {
        curImg.style.display = "none";
        console.log("Image 3 loaded");
        return createImage("img/img-3.jpg");
    })
    .catch((err) => {
        console.log(err);
    });

// todo: Error handling with try & catch
// try {
//     let y = 0;
//     const x = 1;
//     x = 2;
//     console.log(y);
// } catch (err) {
//     console.log(err.message);
// }

// * 1st method for
/* const btn = document.querySelector(".btn-country");
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
            // console.log(data);
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

// todo: Promisifying the geoLocation api

const getPosition = function () {
    return new Promise((resolve, reject) => {
        //  navigator.geolocation.getCurrentPosition(position=>resolve(position), err=>reject(err));
        // equivalent one
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};
getPosition().then((pos) => console.log(pos));

const whereAmI = function () {
    getPosition()
        .then((pos) => {
            const { latitude: lat, longitude: log } = pos.coords;
            return fetch(`https://geocode.xyz/${lat},${log}?geoit=json`);
        })
        .then((response) => {
            if (!response.ok)
                throw new Error(`Problem with geocoding ${response.status}`);
            return response.json();
        })
        .then((data) => {
            console.log(data);
            console.log(`"You are in ${data.city} , ${data.country}"`);

            return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
        })
        .then((response) => {
            if (!response.ok)
                throw new Error(`Country not found (${response.status})`);
            return response.json();
        })
        .then((data) => renderContry(data[0]))
        .catch((error) => {
            console.error(error);
            renderError(`Something went wrong: ${error.message}`);
        })
        .finally(() => {
            countriesContainer.style.opacity = 1;
        });
};
btn.addEventListener("click", whereAmI); */

// todo: Other promises combinator : Race , AllSettled & any

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

// *Promises.allsettled
// never short circuits when a promise rejected
// returns all promises
Promise.allSettled([
    Promise.reject("failed to resolve"),
    Promise.resolve("successfully resolved 2"),
    Promise.resolve("successfully resolved"),
]).then((res) => console.log(res));

// *Promises.any
// return 1st fulfilled array
Promise.any([
    Promise.reject("failed to resolve"),
    Promise.resolve("successfully resolved  12"),
    Promise.resolve("successfully resolved"),
]).then((res) => console.log(res));

// todo: challenge #3

// PART 1
const loadNPause = async function () {
    try {
        // Load image 1
        let img = await createImage("img/img-1.jpg");
        console.log("Image 1 loaded");
        await wait(2);
        img.style.display = "none";

        // Load image 1
        img = await createImage("img/img-2.jpg");
        console.log("Image 2 loaded");
        await wait(2);
        img.style.display = "none";
    } catch (err) {
        console.error(err);
    }
};
loadNPause();

// PART 2
const loadAll = async function (imgArr) {
    try {
        const imgs = imgArr.map(async (img) => await createImage(img));
        const imgsEl = await Promise.all(imgs);
        console.log(imgsEl);
        imgsEl.forEach((img) => img.classList.add("parallel"));
    } catch (err) {
        console.error(err);
    }
};
loadAll(["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"]);

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
// (async function () {
//     // get only 1 result
//     //  rejected value will always will the race result
//     const res = await Promise.race([
//         getJSON(`https://restcountries.com/v3.1/name/italy`),
//         getJSON(`https://restcountries.com/v3.1/name/egypt`),
//         getJSON(`https://restcountries.com/v3.1/name/mexico`),
//     ]);
//     console.log(res[0].capital);
// })();

// const timeout = function (sec) {
//     return new Promise((_, reject) => {
//         setTimeout(function () {
//             reject(new Error("Request took too long"));
//         }, sec * 1000);
//     });
// };

// Promise.race([
//     getJSON(`https://restcountries.com/v3.1/name/bharat`),
//     timeout(1),
// ])
//     .then((data) => console.log(data[0].capital))
//     .catch((err) => console.log(err));
