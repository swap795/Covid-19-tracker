import React, { useState, useEffect } from 'react';
import MapContent from './components/MapContent';
import Info from './components/Info';
import Table from './components/Table';

import { sortData, numberWithCommas } from './util';

// styles
import './App.css';


import { Card, CardContent, Typography } from '@material-ui/core';

// API for countries ---> https://disease.sh/v3/covid-19/countries

function App() {
  const [countries, setCountries] = useState([]);                                 // country's name and value
  const [clickedCountry, setClickedCountry] = useState('All');                    // info of the country that is CLICKED on the dropdown menu
  const [countryInfo, setCountryInfo] = useState({});                             // gets the WORLD'S INFO first -- if not, then -- country's info
  const [tableData, setTableData] = useState([]);                                 // data for the table
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });   // map positions
  const [mapZoom, setMapZoom] = useState(3);                                      // map zoom level
  const [countryPopupInfo, setCountryPopupInfo] = useState([]);                   // country's info for popup on the Map
  const [casesType, setCasesType] = useState("cases");

  /* 
  *   useEffect runs code whenever something changes
  *   in this case, this useEffect runs when the browser loads
  * */

  // get the info of the World
  // total in the world
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(res => res.json())
      .then(data => {
        setCountryInfo(data);
    });
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
        let sortedData = sortData(data);
        setTableData(sortedData);

        setCountries(countries);                              // store data
        setCountryPopupInfo(data);
      })
    }

    getCountries();                                           // call the function 
  }, []);

  return (
    <div className="container">
      <div className="left__container">
        {/* passing the object as props */}
        <MapContent 
          allCountries={ countries } 
          country={ clickedCountry } 
          setCountry= { setClickedCountry }
          countryInfo={ countryInfo }
          setCountryInfo={ setCountryInfo }
          center={ mapCenter }
          setCenter={ setMapCenter }
          zoom={ mapZoom }
          setZoom={ setMapZoom }
          countryPopupInfo={ countryPopupInfo }
          casesType={ casesType }
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
