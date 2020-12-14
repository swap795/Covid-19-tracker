import { MenuItem, FormControl, Select } from '@material-ui/core';

function Map(props) {
   const clickHandler = async (event) => {
      // get the country that is clicked
      const countryCode = event.target.value;

      const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

      props.setCountry(countryCode);
      console.log(event.target.value);
   }
   return(
      <div>
         <FormControl>
            <Select 
               variant="outlined" 
               value={ props.country }
               onChange={ clickHandler } 
            >
               <MenuItem value="worldwide">WorldWide</MenuItem>
               {
                  props.data.map((country) => (
                     <MenuItem value={ country.value }>{country.name}</MenuItem>
                  ))             
               }
            </Select>

         </FormControl>
      </div>
   );
}

export default Map;