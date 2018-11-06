 var app = new Vue({
     el: '#app',
     data: {
         cities: [],
         // url: "https://api.myjson.com/bins/i8run",
         url: "https://api.openweathermap.org/data/2.5/group?id=2643743,1850147,2147714,524901,5128581,1819729&units=metric&appid=4835de947c0522e6c3c7f5067f10bfff",
         search: "",
         searchCity: "",
         cityAlreadyAdded: false // global variable for HTML can access. Display false to display nothing first.
     },
     methods: {
         fetchData(searchUrl) { // fetchData function to fetch data from a URL
             fetch(searchUrl, { // first promise: Fetch is a promise to get data from a HTTP request
                     method: 'GET', // using GET = to request data // GET is the default so in this case its optional
                 })
                 // Fetch returns a promise when it completes its HTTP request. It returns another promise with the response of the HTTP data.
                 .then(function (resp) { // response is a reference of data on the internet
                     return resp.json(); // second promise: call of .json which downloads the data from the HTTP response and returns it.
                 })
                 .then(function (data) { // The data is downloaded from the previous promise, we can now use it in a function
                     if (app.cities.length >= 6) {
                         app.cities.splice(0, 0, data); //splice(position, numberOfItemsToRemove, item) add data to first position
                     } else {
                         app.cities = data.list;
                     }
                 })
         },
         getCityImages() { // create random number generator
             var num = (Math.floor(Math.random() * 9) + 1).toString() // .toString =
             return "./assets/images/landscape-" + num + ".jpg"
         },
         // match weather icon with appropriate description and display
         getWeatherIcon(description) {
             if (description.match(/sun/g)) {
                 return "./icons/sun.gif"
             } else if (description.match(/clear/g)) {
                 return "./icons/sun.gif"
             } else if (description.match(/clouds/g)) {
                 return "./icons/clouds.gif"
             } else if (description.match(/rain/g)) {
                 return "./icons/rain.gif"
             }
         },
         secondFetch() { // second fetch city by name
             for (var i = 0; i < this.cities.length; i++) {
                 if (this.cities[i].name.toLowerCase() === this.searchCity.toLowerCase()) { //if array contains same city
                     this.cityAlreadyAdded = true; //global variable is true
                     return; // stops here and return the above code. Else keep going. 
                 } else {
                     this.cityAlreadyAdded = false; // else it's false
                 }
             }
             this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.searchCity + "&units=metric&APPID=4835de947c0522e6c3c7f5067f10bfff";
             this.fetchData(this.url); // then puts the URL into the fetchData function as argument
             // both URLs passed thru fetchData function as argument. Data comes back and if array more than 6 it add another one to the front else array is data.list (the 6 default cities).
         }
     },
     created() {
         this.fetchData(this.url); // first fetch. this function runs first soon as page is created
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
