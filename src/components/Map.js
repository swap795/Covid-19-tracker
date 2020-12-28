import { MenuItem, FormControl, Select } from '@material-ui/core';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import styled from 'styled-components';


const MapStyle = styled.div`
   background-color: #acaaaa;
   height: 60vh;
   width: 100%;
   border-radius: .6rem;
   padding: 1rem;
   margin-top: 1rem;
   margin-bottom: 1rem;
   box-shadow: 0 0 1rem -.5rem black;

   /* need this to actually display the container */
   .leaflet-container {
      width: 100%;
      height: 100%;
   }
`;

function Map(props) {
   // handles the click on dropdown menu
   // also sets the info of countries in the infoBoxes
   const clickHandler = async (event) => {
      // get the country that is clicked
      const countryCode = event.target.value;
      const url = countryCode === 'All' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
      await fetch(url)
         .then(res => res.json())
         .then(data => {
            props.setCountry(countryCode);                // set the country code
            props.setCountryInfo(data);                   // set the country info object
            props.setCenter(
               {
                  lat: data.countryInfo.lat, 
                  lng: data.countryInfo.long,
               }
            );
            props.setZoom(4);
            // console.log({lat: data.countryInfo.lat, lng: data.countryInfo.long})
      })
   }

   return(
      <div>
         <FormControl>
            <Select 
               variant="outlined" 
               value={ props.country }
               onChange={ clickHandler } 
            >
               <MenuItem value="All">All</MenuItem>
               {
                  props.allCountries.map((country) => (
                     <MenuItem value={ country.value }>{country.name}</MenuItem>
                  ))             
               }
            </Select>
         </FormControl>
         <MapStyle>
            <MapContainer center={ [props.center.lat, props.center.lng] } zoom={ props.zoom }>
               <TileLayer 
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               >
               </TileLayer>
            </MapContainer>
         </MapStyle>
      </div>
   );
}

export default Map;