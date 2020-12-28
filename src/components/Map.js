import { MenuItem, FormControl, Select } from '@material-ui/core';
import styled from 'styled-components';

const MapContainer = styled.div`
   /* background-color: grey; */
   height: 60vh;
   width: 100%;
   margin-top: 1rem;
   margin-bottom: 1rem;
`;

function Map(props) {
   // handles the click on dropdown menu
   // also sets the info of countries in the infoBoxes
   const clickHandler = async (event) => {
      // get the country that is clicked
      const countryCode = event.target.value;

      const url = countryCode === 'All' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

      await fetch(url).then(res => res.json()).then(data => {
         props.setCountry(countryCode);                // set the country code
         props.setCountryInfo(data);                   // set the country info object
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
         <MapContainer>
            
         </MapContainer>
      </div>
   );
}

export default Map;