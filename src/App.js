// import './App.css';

import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import Cases from './components/Cases';
import Deaths from './components/Deaths';
import Recovered from './components/Recovered';


import { MenuItem, FormControl, Select } from '@material-ui/core';

// API for countries ---> https://disease.sh/v3/covid-19/countries

function App() {
  const [countries, setCountries] = useState([]);

  // useEffect runs code whenever something changes
  // in this case, code runs when the browser loads
  useEffect(() => {
    const getCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())                    // only want the JSON stuff
      .then((data) => {
        const countries = data.map((country) => (             // loop through every data and only get the country's name and iso3 ('USA')
          {
              name: country.country,
              value: country.countryInfo.iso3,
              cases: country.cases,
              deaths: country.deaths,
              recovered: country.recovered
          }
        ));

        setCountries(countries);                              // store those data
      })
    }

    getCountries();                                           // call the function 
  }, []);

  return (
    <div>
      {/* passing the object as props */}
      <Map data={ countries } />
      <div>
        This is a Map.
      </div>
      <Cases data={ countries } />
      <Deaths data={ countries } />
      <Recovered data={ countries } />
    </div>
  );
}

export default App;
