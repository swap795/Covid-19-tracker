import React from 'react';
import styled from 'styled-components';

import { numberWithCommas } from '../util';

const TableContainer = styled.div`
   background-color: #e8e8e8;
   /* background-color: red; */
   border-radius: 1rem;
   padding: 0.3rem 0.3rem 0.3rem 0.3rem;
   height: 33rem;
   margin: .5rem 0 1rem 0;
   border-spacing: 1rem 0;
   overflow: scroll;
   /* justify-content: center; */
   
   ::-webkit-scrollbar {
      display: block;
      width: .7rem;
      height: 0;
   }
   ::-webkit-scrollbar-thumb {
      background-color: #6f9eaf;
   }

   table {
      margin-left: auto;
      margin-right: auto;
      width: 100%;
   }

   th {
      font-size: 1.3rem;
      padding-bottom: 1rem;
   }
   tr {
      /* width: 100%auto; */
      display: flex;
      justify-content: space-between;
   }
   td {
      padding: 0.3rem;
   }
   tr:nth-of-type(even) {
      background-color: #cdd0cb;
      border-radius: .3rem;
   }
`;

function Table(props) {
   const countries = props.data;

   return (
      <TableContainer>
         <table>
            <tbody>
               <tr>
                  <th>Countries</th>
                  <th>Cases</th>
               </tr>
               {
                  countries.map(country => (
                     <tr>
                        <td>
                           { country.country }
                        </td>
                        <td>
                           { numberWithCommas(country.cases) }
                        </td>
                     </tr>
                  ))
               }
            </tbody>
         </table>
      </TableContainer>
   )
}

export default Table;
