import { MenuItem, FormControl, Select } from '@material-ui/core';

function Map(props) {
   return(
      <div>
         <FormControl>
            <Select variant="outlined" value="dropdown">
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