import React, { useState } from 'react';

function Search() {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [conditions, setConditions] = useState({});

  function handleSearch() {
    const query = document.getElementById('search-box').value;
    const api_key = 'xh1gZ5GVY5JRDGojVPRMJJVcus3OQs9H';
    const search_url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${api_key}&q=${query}`;

    fetch(search_url)
      .then((response) => response.json())
      .then((results) => {
        if (results.length > 0) {
          setResults(results);
          setSelectedResult(null);
          setConditions({});
        } else {
          setResults([]);
          setSelectedResult(null);
          setConditions({});
        }
      })
      .catch((error) => {
        setResults([]);
        setSelectedResult(null);
        setConditions({});
      });
  }

  function handleResultClick(result) {
    setSelectedResult(result);
    const api_key = 'xh1gZ5GVY5JRDGojVPRMJJVcus3OQs9H';
    const conditions_url = `http://dataservice.accuweather.com/currentconditions/v1/${result.Key}?apikey=${api_key}`;
    fetch(conditions_url)
      .then((response) => response.json())
      .then((conditions) => setConditions(conditions[0]))
      .catch((error) => setConditions({}));
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
                <li
                  key={result.Key}
                  onClick={() => handleResultClick(result)}
                  style={{ cursor: 'pointer' }}
                >
                  {result.LocalizedName}, {result.Country.LocalizedName}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No results found.</p>
        )}
        {selectedResult && conditions.Temperature ? (
          <div>
            <p>Current conditions for {selectedResult.LocalizedName}:</p>
            <p>
              Temperature: {conditions.Temperature.Imperial.Value}{' '}
              {conditions.Temperature.Imperial.Unit}
            </p>
            <p>Weather Text: {conditions.WeatherText}</p>
          </div>
        ) : (
          <p>{selectedResult ? 'Loading current conditions...' : 'No current conditions available.'}</p>
        )}
      </div>
    </div>
  );
}

export default Search;
