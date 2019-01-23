// Note on APIS:
// Interface to a service which allows a programmer to interact with the service to perform tasks.
// Available tasks are part of the API. i.e. you can only do what the API allows you to do

// RESTFUL APIs
// These are APIs over HTTP, typically a service over the internet
// They contain a BaseURL, a Method then optionally query params, url params, post body
// example:
// BaseUrl could be: api.service.com
// Query params are options passed with the URL: e.g. api.service.com/someAction?key=value&key2=value2 // caveat limited to the max length of a url
// URL Params, these form part of the URL path. e.g. api.service.com/profile/{id} // id is part of the path, it could be a user ID in this case
// Body, usually a massive chunk of JSON send as part of the request. 
var app = new Vue({
    el: '#app',
    data: {
        cities: [],
        // url: "https://api.myjson.com/bins/i8run",
        url: "https://api.openweathermap.org/data/2.5/group?id=2208791,2208425,2212771,2217362,2216885,2210247,2210221,2215163,2219905,2208485,2563191,2523650,2523693,2524119,2523581&units=metric&appid=4835de947c0522e6c3c7f5067f10bfff",
        search: "",
    },
    methods: {
        // convertKelvinToCelsius(kelvin){
        //     return (kelvin - 273.15).toFixed(1);
        // },
        // fetchData function to fetch data from a URL
        fetchData() {
            // var turl = new URL(this.url);
            // const params = { 
            //     id: this.cityIds.join(","),
            //     appid: "4835de947c0522e6c3c7f5067f10bfff",
            //     units: "metric",
            // };
            // Object.keys(params).forEach(function (key) {
            //   turl.searchParams.append(key, params[key])
            // })
            // fetch is a built in browser method. This means its a method that most modern browsers 
            // (chrome,firefox,safari etc..) will understand. It is used to do HTTP requests to communicate with API
            fetch(this.url, { // Fetch is a promise to get data from a HTTP request
                    // Method is required for all HTTP requests. The default is GET, Others incliude POST,DELETE,PATCH,OPTIONS etc. There are sometimes called verbs
                    method: 'GET', // using GET = to request data // GET is the default so in this case its optional
                })
                // Fetch returns a promise when it completes its HTTP request. It returns another promise with the response of the HTTP data.
                .then(function (resp) { // response if a reference of data on the internet
                    return resp.json(); // second promise: call of .json which downloads the data form the HTTP response and returns it.
                })
                .then(function (data) { // The data is downloaded from the previous promise, we can now use it in a function
                    app.cities = data.list;
                    console.log(app.cities);
                })
        },
        // put background image in random order
        getCityImages() {
            // Generate random numbers in Javascript
            // Math.random creates a random number between 0 and 1 e.g 0.3535343
            // We multiply this by our upper bound, in this case 9. 
            // We take Math.floor to get the lowest bound of the decimal number
            // We add 1 because we generate numbers form 0-1 we could get 0 but out lowest number acceptable is 1.
            // toString is because we are concatenating strings. If we did not have this then we would attempt to add a number to a string.
            var num = (Math.floor(Math.random() * 9) + 1).toString()
            return "./assets/images/landscape-" + num + ".jpg"
        },
        // match weather icon with appropriate description and display
        getWeatherIcon(desc) {
            // we pass through a parameter from the caller in html. We are calling it desc.
            // check what the description is. look for matches and return a string which is the path to the icon.
            // In the HTML the string is then bound to src of the img tag which displays it
            // Return ends the function so this will return on the first match
            if (desc.match(/sun/g)) {
                return "./icons/sun.gif"
            } else if (desc.match(/clouds/g)) {
                return "./icons/clouds.gif"
            } else if (desc.match(/rain/g)) {
                return "./icons/rain.gif"
            }
            // var src = document.getElementById('iconImg').getAttribute('src');
            // if (city.weather[0].description.match(/sun/g)) {
            // iconImg.style.display('src', "sun.gif");
            // } else if (city.weather[0].description.match(/clouds/g)) {
            //     iconImg.style.display('src', "clouds.gif");
            // } else if (city.weather[0].description.match(/rain/g)) {
            //     iconImg.style.display('src', "rain.gif");
            // }
        }
    },
    created() {
        this.fetchData();
        // this.getWeatherIcon();
    },
    computed: {
        filteredCities() {
            var cityName = this.cities.filter((city) => {
                return city.name.toLowerCase().match(this.search.toLowerCase());
            });

            return cityName;
        }
    }
})