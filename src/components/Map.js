import { MenuItem, FormControl, Select } from '@material-ui/core';

function Map(countries) {
   return(
      <div>
         <FormControl>
            <Select variant="outlined" value="dropdown">
               {
                  countries.map((country) => (
                     <MenuItem value={ country.value }>{country.name}</MenuItem>
                  ))             
               }
            </Select>
         </FormControl>
         <div>
            This is a Map.
         </div>
      </div>
   );
}

export default Map;