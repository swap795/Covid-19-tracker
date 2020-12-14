// import './App.css';

import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import Map from './components/Map';

import { MenuItem, FormControl, Select } from '@material-ui/core';

// API for countries ---> https://disease.sh/v3/covid-19/countries

function App() {
  const [countries, setCountries] = useState([]);

  // useEffect runs code whenever something changes, in this case the countries
  useEffect(() => {
     const getCountries = async () => {
        await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
           const countries = data.map((country) => (
              {
                 name: country.country,
                 value: country.countryInfo.iso3,
              }
           ));

           setCountries(countries);
           console.log(countries);
        })
     }

     getCountries();
  }, []);

  return (
    <div>
      <Map data={ countries } />
      <div>
        This is a Map.
      </div>
    </div>
  );
}

export default App;
