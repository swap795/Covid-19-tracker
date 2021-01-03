import React, { useState, useEffect } from 'react';
import MapContent from './components/MapContent';
import Info from './components/Info';
import Table from './components/Table';
import CovidGraph from './components/CovidGraph';

import { sortData, numberWithCommas } from './util';

// styles
import styled from 'styled-components';
import './styles/App.css';


import { Card, CardContent, Typography, withTheme } from '@material-ui/core';


const InfoBoxes = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #cdd0cb;
  border-radius: 1rem;
  padding: 1rem;
  width: 100%;
`;


/*
*   These three style stored variables are passed in as props into the Info componenet seperately
*/
const casesColor = {
  // backgroundColor: '#CC1034',
  border: '.15rem solid #a55362',
  backgroundColor: '#dd7588',
  // color: '#3a3a3a',
}

const recoveredColor = {
  border: '.15rem solid #567e63',
  backgroundColor: '#80bd94',
}

const deathsColor = {
  border: '.15rem solid #302f2e',
  backgroundColor: '#5a5655',
  color: 'white',
}


// API for countries ---> https://disease.sh/v3/covid-19/countries


/*
*
*     ACTUAL RENDER
*
*/
function App() {
  const [countries, setCountries] = useState([]);                                 // country's name and value
  const [clickedCountry, setClickedCountry] = useState('All');                    // info of the country that is CLICKED on the dropdown menu
  const [countryInfo, setCountryInfo] = useState({});                             // gets the WORLD'S INFO first -- if not, then -- country's info
  const [tableData, setTableData] = useState([]);                                 // data for the table
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });   // map positions
  const [mapZoom, setMapZoom] = useState(3);                                      // map zoom level
  const [countryPopupInfo, setCountryPopupInfo] = useState([]);                   // country's info for popup on the Map
  const [casesType, setCasesType] = useState("cases");                            // which type of case is it? (ex: cases, recovered, deaths)

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
      {
      /* 
      *   LEFT container
      *
      */
      }
      <div className="left__container">
        {/* passing the object as props */}
        <MapContent 
          allCountries={ countries } 
          clickedCountry={ clickedCountry } 
          setClickedCountry= { setClickedCountry }
          countryInfo={ countryInfo }
          setCountryInfo={ setCountryInfo }
          center={ mapCenter }
          setCenter={ setMapCenter }
          zoom={ mapZoom }
          setZoom={ setMapZoom }
          countryPopupInfo={ countryPopupInfo }
          casesType={ casesType }
        />
        <InfoBoxes>
          <Info 
            style={ casesColor }
            onClick={ () => setCasesType("cases") } 
            casesType={ casesType } 
            title="Today's Cases" 
            case={ countryInfo.todayCases } 
            total={ countryInfo.cases }
          />
          <Info 
            style={ recoveredColor }
            onClick={ () => setCasesType("recovered") } 
            casesType={ casesType } 
            title="Today's Recovered" 
            case={ countryInfo.todayRecovered } 
            total={ countryInfo.recovered }
          />
          <Info 
            style={ deathsColor }
            onClick={ () => setCasesType("deaths") } 
            casesType={ casesType } 
            title="Today's Deaths" 
            case={ countryInfo.todayDeaths } 
            total={ countryInfo.deaths }
          />
        </InfoBoxes>
        <CovidGraph />
      </div>
      {
      /* 
      *   RIGHT container
      *
      */
      }
      <div className="right__container">
        <Card>
          <CardContent>
            <h2>Live Cases</h2>
            <Table data={ tableData } />
            <h2>Worldwide new Cases</h2>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
