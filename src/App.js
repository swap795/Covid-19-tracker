// import './App.css';

import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import Cases from './components/Cases';
import Deaths from './components/Deaths';
import Recovered from './components/Recovered';
import Info from './components/Info';


import { MenuItem, FormControl, Select } from '@material-ui/core';

// API for countries ---> https://disease.sh/v3/covid-19/countries

function App() {
  // get all the countries
  const [countries, setCountries] = useState([]);
  // get worldwide
  const [clickedCountry, setClickedCountry] = useState('WorldWide');

  const [countryInfo, setCountryInfo] = useState({});

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
          }
        ));

        setCountries(countries);                              // store those data
      })
    }

    getCountries();                                           // call the function 
  }, []);

  useEffect(() => {
    const getInfo = async () => {
      await fetch(`https://disease.sh/v3/covid-19/countries/${clickedCountry}`)
      .then((response) => response.json())
      .then((data) => {
        const info = {
          cases: clickedCountry.cases,
          recovered: clickedCountry.recovered,
          deaths: clickedCountry.deaths,
        }
      });

      setCountryInfo(countryInfo);
    }

    getInfo();
  }, [clickedCountry]);

  console.log(countryInfo);

  return (
    <div>
      {/* passing the object as props */}
      <Map 
        data={ countries } 
        country={ clickedCountry } 
        setCountry= { setClickedCountry }
      />
      <div>
        This is a Map.
      </div>
      {/* <Cases data={ countries } />
      <Deaths data={ countries } />
      <Recovered data={ countries } /> */}
      <Info title="Cases" case={ countryInfo.cases } />
      <Info title="Recovered" case={ countryInfo.recovered }/>
      <Info title="Deaths" case={ countryInfo.deaths }/>
    </div>
  );
}

export default App;
