import React, { useState, useEffect } from 'react';
import MapContent from './components/MapContent';
import Info from './components/Info';
import Table from './components/Table';
import CovidGraph from './components/CovidGraph';
import Footer from './components/Footer';

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

  @media (max-width: 1024px) {
    padding: .5rem;
    margin-left: 4rem;
    width: 85%;
  }

  @media (max-width: 425px) {
    flex-direction: column;
    padding: 0.5rem;
    margin-left: 0.5rem;
    width: 90%;
  }
`;

const AppHeader = styled.div`
  font-family: sans-serif, sans-serif;
  font-weight: bolder;
  font-size: 2.5rem;
  text-align: center;
`;

const cardStyle = {
  backgroundColor: '#cdd0cb',
}

/*
*   These three style stored variables are passed in as props into the Info componenet seperately
*/
const casesColor = {
  border: '.15rem solid #a55362',
  backgroundColor: '#dd7588',
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
  const [mapCenter, setMapCenter] = useState({ lat: 10, lng: 5 });   // map positions
  const [mapZoom, setMapZoom] = useState(1.5);                                      // map zoom level
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
    <div style={{ backgroundColor: '#e8eae6' }}>
      <div className="container">
      {
      /* 
      *   LEFT container
      *
      */
      }
        <div className="left__container">
          <AppHeader>COVID-19 Tracker</AppHeader>
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
          <InfoBoxes className="infoBoxes">
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
          <CovidGraph casesType={ casesType } />
        </div>
        {
        /* 
        *   RIGHT container
        *
        */
        }
        <div className="right__container">
          <Card style={ cardStyle }>
            <CardContent>
              <h2>Live Cases</h2>
              <Table data={ tableData } />
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Started Working on it but idk if we need it? */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
