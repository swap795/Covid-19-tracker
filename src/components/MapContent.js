import { MenuItem, FormControl, Select } from '@material-ui/core';
import { useMap, MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';

import styled from 'styled-components';
import { drawCircle } from '../util';



// temporary imports for testing


const MapStyle = styled.div`
   /* background-color: #acaaaa; */
   background-color: #cdd0cb;
   height: 50vh;
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


function MapContent(props) {
   // handles the click on dropdown menu
   // also sets the info of countries in the infoBoxes
   const clickHandler = async (event) => {
      // get the country that is clicked
      const countryCode = event.target.value;
      const url = countryCode === 'All' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
      await fetch(url)
         .then(res => res.json())
         .then(data => {
            props.setClickedCountry(countryCode);                // set the country code
            props.setCountryInfo(data);                   // set the country info object

            if(countryCode === 'All') {
               props.setCenter({ lat: 30, lng: 0 });
               props.setZoom(2);
            } else {
               props.setCenter({ lat: data.countryInfo.lat, lng: data.countryInfo.long });
            }

            switch(data.continent) {
               case 'North America':
                  props.setZoom(4.3);
                  break;
               case 'South America':
                  props.setZoom(5);
                  break;
               case 'Africa':
                  props.setZoom(5);
                  break;
               case 'Europe':
                  props.setZoom(5);
                  break;
               case 'Asia':
                  props.setZoom(5);
                  break;
               case 'Australia':
                  props.setZoom(5);
                  break;
            }
      })
   }

   const MyComponent = () => {
      const map = useMap();
      map.setView([props.center.lat, props.center.lng], props.zoom);
      return null;
   }


   return(
      <div>
         <FormControl>
            <Select 
               variant="outlined" 
               value={ props.clickedCountry }
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
            <MapContainer center={ props.center } zoom={ props.zoom }>
               <MyComponent />
               <TileLayer 
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               >
               </TileLayer>
               {/* Popups for countries */}
               {
                  drawCircle(props.countryPopupInfo, props.casesType, props.clickedCountry)
               }
            </MapContainer>
         </MapStyle>
      </div>
   );
}

export default MapContent;