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
