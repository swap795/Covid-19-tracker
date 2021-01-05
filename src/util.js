import React from 'react';
import { Circle, Tooltip, Popup} from 'react-leaflet';
import numeral from 'numeral';

import styled from 'styled-components';



// display commas in numbers
export const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// sort the data (cases) numerically
export const sortData = (data) => {
  const newData = [...data];

  return newData.sort((a, b) => a.cases > b.cases ? -1 : 1);
}

// draw circles on the Map
const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    // hex: "#222831",
    multiplier: 500,
  },
  recovered: {
    // hex: "#7dd71d",
    hex: "#70af85",
    multiplier: 800,
  },
  deaths: {
    hex: "#433d3c",
    multiplier: 1000,
  },
};

const PopupStyle = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  background-color: #f1f1f1;
  padding: .5rem;
  /* width: 100%; */
`;

const PopupItem = styled.div`
  span {
    font-size: 0.85rem;
  }
`;


export const drawCircle = (data, casesType, clickedCountry) => {  
  return data.map((country) => {
    return (
      <Circle
        center={ [country.countryInfo.lat, country.countryInfo.long] }
        fillOpacity={ 0.4 }
        // color={ casesTypeColors[casesType].hex }
        // fillColor= { casesTypeColors[casesType].hex }
        pathOptions={{ 
          color: casesTypeColors[casesType].hex,
          fillColor: casesTypeColors[casesType].hex 
        }}
        radius={ Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier }
      >
        <Tooltip>{ country.country }</Tooltip>
        <Popup>
          <div style={{ 
            backgroundImage: `url(${country.countryInfo.flag})`,
            backgroundSize: '100% 100%',
            height: '7.5rem',
            width: '11.5rem',
          }}></div>
          <PopupStyle>
            <PopupItem><span>Population:</span></PopupItem>
            <PopupItem>{ numeral(country.population).format('0.000 a') }</PopupItem>
            <PopupItem><span>Total Cases:</span></PopupItem>
            <PopupItem>{ numeral(country.cases).format('0.000 a') }</PopupItem>
            <PopupItem><span>Active Cases:</span></PopupItem>
            <PopupItem>{ numeral(country.active).format('0.000 a') }</PopupItem>
            <PopupItem><span>Total Recovered:</span></PopupItem>
            <PopupItem>{ numeral(country.recovered).format('0.000 a') }</PopupItem>
            <PopupItem><span>Total Deaths:</span></PopupItem>
            <PopupItem>{ numeral(country.deaths).format('0.000 a') }</PopupItem>
          </PopupStyle>
        </Popup>
      </Circle>
    )
  })
}