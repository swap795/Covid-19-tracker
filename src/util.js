// display commas in numbers
export const numberWithCommas = (num) => {
   console.log(num);
   return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
 }


// sort the data (cases) numerically
export const sortData = (data) => {
   const newData = [...data];

   return newData.sort((a, b) => a.cases > b.cases ? -1 : 1);
 }


