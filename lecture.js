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

const getCountryData1 = function (country) {
    // country 1
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then((response) => {
            console.log(response);
            if (!response.ok)
                throw new Error(`Country not found (${response.status})`);

            // getCountryData1("hdsdgd"); for this call the error handled
            return response.json();
        }) // happen when successful
        .then((data) => {
            // it will call itself when Promisesis fullfilled
            console.log(data);
            renderContry(data[0]);
            const neighbour = data[0].borders[0];
            if (!neighbour) return;

            // country 2
            return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
        })
        .then((response) => response.json())
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

// todo: practice
const getCountryData1 = function (country) {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            renderContry(data[0]);
            const neighbour = data[0].borders[0];
            if (!neighbour) return;

            return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
        })
        .then((response) => response.json())
        .then((data) => {
            renderContry(data[0], "neighbour");
        });
};
getCountryData1("bharat");

// todo: handling error (rejected Promises)
// fetch shows error only due to internet connection
