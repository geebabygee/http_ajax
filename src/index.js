// FIRST PART OF LECTURE:
// Selecting a DOM element and binding an event listener to it
// ================================================================

const button = document.querySelector("#click-me");
console.log(button);

 const changeButton = (event) => {
  // console.log(event.currentTarget);
  // button.innerText = "Gunaydin!!"; // we can do this to change the text ORRRR we can use the event.currentTarget
  event.currentTarget.innerText = "Gunaydin!!";
  //event.currentTarget is what the event listener is attached to, here it's the button
}

// //Clicking a button and reacting to it
// // button.addEventListener(EVENTTYPE, CALLBACK)
button.addEventListener("click", changeButton)
// When the button is clicked, the callback is triggered. No () after callback as we are not calling, we are passing it as a reference, when we call it we will pass the event argument with it, the receiving function changeButton will receive the event so we can do event.currentTarget.


// // GET REQUEST TO OMDB API
// // ================================================================

const results = document.querySelector("#results"); // Select the ul from the page
const form = document.querySelector("#search-movies"); // Select the form from the page
const url = "http://www.omdbapi.com/?s=harry potter&apikey=adf1f2d7"

const getMovie = (keyword) => {
  fetch(`http://www.omdbapi.com/?s=${keyword}&apikey=adf1f2d7`) // get request to api using the url
    .then(response => response.json()) // Api responds with a response object of status 200, we take the response object the api gives back and parse it to json so we can look inside the data returned.
    .then((jsonData) => { // once turned to json, we get back a json hash as data
      // console.log(jsonData); // very  important step! always console log your data to see what you get back

      // We iterate through the data because each movie is a seperate hash
      jsonData.Search.forEach((movie) => {
        //for each movie I make an li with the image and p
        const newMoview = `<li class="list-inline-item">
          <img src="${movie.Poster}">
          <p>${movie.Title}</p>
        </li>`;
        //Insert the html in the results
        results.insertAdjacentHTML("beforeend",newMoview )
      });
    });
}

// // Adding event listener on form
form.addEventListener("submit", (event) => {
  event.preventDefault(); // prevent the form from submitting to the server and refreshing the page. We pause it while we do our Api call
  results.innerHTML = ""; // reset html before each search
  const keyword = document.querySelector("#keyword").value; // Grab value from input
  // console.log(keyword);
  getMovie(keyword); //callback
});


// GET REQUEST TO OMDB API WITH CALLBACKS EXTRACTED
// ================================================================

const getMovie = (keyword) => {
  fetch(`http://www.omdbapi.com/?s=${keyword}&apikey=adf1f2d7`) api using the url
    .then(response => response.json())
    .then((updateHtml)); // CALLBACK! we pass reference to the updateHtml function which will receive the data parameter from the AJAX call. The callback happens on receive the data as json back successfully.
}

const updateHtml = (jsonData) => {
  jsonData.Search.forEach((movie) => {
    const newMoview = `<li class="list-inline-item">
      <img src="${movie.Poster}">
      <p>${movie.Title}</p>
    </li>`;
    results.insertAdjacentHTML("beforeend",newMoview )
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  results.innerHTML = "";
  const keyword = document.querySelector("#keyword").value;
  getMovie(keyword); //callback
});


// POST REQUEST TO ALGOLIA PLACES API
// ================================================================

const results = document.querySelector("#results"); // Select the ul

const input = document.querySelector("#search"); // Select the input

const searchAlgoliaPlaces = (event) => {
  fetch("https://places-dsn.algolia.net/1/places/query", { // call the api url
    method: "POST", // the method is post because the api specifies this
    body: JSON.stringify({ query: event.currentTarget.value }) // with a post request we have to send a body to the server. The content of the body is the keys we pressed. Every key pressed sends a request to the server.
    //event.currentTarget is what the event listener is attached to --> input, we grab its value.
  }) // REPEAT GET REQUEST --> TO SEE THE RESULTS
    .then(response => response.json())
    .then((data) => {
      // console.log(data.hits); // Look at local_names.default
      data.hits.forEach((suggestion) => {
        const li = `<li>${suggestion.country_code}</li>`
        results.insertAdjacentHTML("beforeend", li)
      })
    });
};

input.addEventListener("keyup", searchAlgoliaPlaces);
//1. We add event listener on input
//2. On each key pressed we perform the callback - searchAlgoliaPlaces










































