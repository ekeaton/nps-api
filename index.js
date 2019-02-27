'use strict'

const apiKey = 'Xa1eZub2L8x52EOq1mBvaBDSHYl40PNzPzplvJVM';
const searchURL = 'https://api.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 1; i < responseJson.data.length; i++){
    // for each park object in the data
    //array, add a list item to the results 
    //list with the parks fullname, description,
    //and website URL 
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href='${responseJson.data[i].url}'>${responseJson.data[i].url}</a>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function searchForParks(query, maxResults=10) {
  const params = {
    stateCode: query,
    limit: maxResults,
    start: 1,
    key: apiKey,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url)


  fetch(url)
  .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}


function watchForm() {
$('form').submit(event => {
  event.preventDefault();
  const searchTerm = $('#js-search-term').val();
  const maxResults = $('#js-max-results').val();
  searchForParks(searchTerm, maxResults);

  });
}

$(watchForm);