import React, { useState } from 'react';

function Search() {
  const [results, setResults] = useState([]);
  const [conditions, setConditions] = useState({});

  function handleSearch() {
    // Get user input for search query
    const query = document.getElementById('search-box').value;

    // Set API key and query parameters
    const api_key = 'xh1gZ5GVY5JRDGojVPRMJJVcus3OQs9H';
    const search_url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${api_key}&q=${query}`;

    // Send GET request to search API
    const xhr_search = new XMLHttpRequest();
    xhr_search.open('GET', search_url);
    xhr_search.onload = function () {
      if (xhr_search.status === 200) {
        // Parse JSON response and set results to locations array
        const results = JSON.parse(xhr_search.responseText);
        setResults(results);
      } else {
        setResults([]);
        setConditions({});
      }
    };
    xhr_search.send();
  }

  function handleResultClick(location_key) {
    // Set API key and query parameters for current conditions API
    const api_key = 'xh1gZ5GVY5JRDGojVPRMJJVcus3OQs9H';
    const conditions_url = `http://dataservice.accuweather.com/currentconditions/v1/${location_key}?apikey=${api_key}`;

    // Send GET request to current conditions API
    const xhr_conditions = new XMLHttpRequest();
    xhr_conditions.open('GET', conditions_url);
    xhr_conditions.onload = function () {
      if (xhr_conditions.status === 200) {
        // Parse JSON response and set conditions to result
        const conditions = JSON.parse(xhr_conditions.responseText);
        setConditions(conditions[0]);
      } else {
        setConditions({});
      }
    };
    xhr_conditions.send();
  }

  return (
    <div>
      <label htmlFor="search-box">Search for a city:</label>
      <input type="text" id="search-box" />
      <button onClick={handleSearch}>Search</button>
      <br />
      <br />
      <div id="results">
        {results.length > 0 ? (
          <div>
            <p>{results.length} results found:</p>
            <ul>
              {results.map((result) => (
                <li key={result.Key}>
                  {result.LocalizedName}, {result.Country.LocalizedName}
                  <button onClick={() => handleResultClick(result.Key)}>Get Current Conditions</button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No results found.</p>
        )}
        {conditions ? (
          <div>
            <p>Current conditions:</p>
            <p>
              Temperature: {conditions.Temperature.Imperial.Value} {conditions.Temperature.Imperial.Unit}
            </p>
            <p>Weather Text: {conditions.WeatherText}</p>
          </div>
        ) : (
          <p>No current conditions available.</p>
        )}
      </div>
    </div>
  );
}

export default Search;
