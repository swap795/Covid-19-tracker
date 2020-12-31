import React from 'react';
import numeral from 'numeral';
import { Circle, Popup} from 'react-leaflet';

// display commas in numbers
export const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// sort the data (cases) numerically
export const sortData = (data) => {
  const newData = [...data];

  return newData.sort((a, b) => a.cases > b.cases ? -1 : 1);
}


const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb443",
    multiplier: 2000,
  },
};

export const drawCircle = (data, casesType = 'cases') => {

  data.map((country) => {
    <Circle
      center={ [country.countryInfo.lat, country.countryInfo.lng] }
      fillOpacity={ 0.4 }
      color={ casesTypeColors[casesType].hex }
      fillColor= { casesTypeColors[casesType].hex }
      radius={ Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier }
    >
      <Popup>
        <h1>Popup</h1>
      </Popup>
    </Circle>
  })
}


