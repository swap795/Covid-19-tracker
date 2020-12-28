import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import Info from './components/Info';
import Table from './components/Table';

import { sortData, numberWithCommas } from './util';

// styles
import './App.css';


import { Card, CardContent, Typography } from '@material-ui/core';

// API for countries ---> https://disease.sh/v3/covid-19/countries

function App() {
  // get all the countries
  const [countries, setCountries] = useState([]);
  // get worldwide
  const [clickedCountry, setClickedCountry] = useState('All');
  // get country's info
  const [countryInfo, setCountryInfo] = useState({});

  const [tableData, setTableData] = useState([]);

  /* 
  *   useEffect runs code whenever something changes
  *   in this case, code runs when the browser loads
  * */

  // get the info of the World
  // total in the world
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(res => res.json())
      .then(data => {
        setCountryInfo(data);
    })
  }, [])

  // get the data of all countries
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

        // sort the countries by cases for our table
        const sortedData = sortData(data);
        setTableData(sortedData);

        setCountries(countries);                              // store data
      })
    }

    getCountries();                                           // call the function 
  }, []);

  return (
    <div className="container">
      <div className="left__container">
        {/* passing the object as props */}
        <Map 
          allCountries={ countries } 
          country={ clickedCountry } 
          setCountry= { setClickedCountry }
          countryInfo={ countryInfo }
          setCountryInfo={ setCountryInfo }
        />
        <div className="InfoBoxes">
          <Info title="Today's Cases" case={ countryInfo.todayCases } total={ countryInfo.cases }/>
          <Info title="Today's Recovered" case={ countryInfo.todayRecovered } total={ countryInfo.recovered }/>
          <Info title="Today's Deaths" case={ countryInfo.todayDeaths } total={ countryInfo.deaths }/>
        </div>
      </div>


      <div className="right__container">
        <Card>
          <CardContent>
            <h3>Live Cases by Countries</h3>
            <Table data={ tableData } />
            <h3>Worldwide new Cases</h3>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
