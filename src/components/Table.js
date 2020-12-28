import React from 'react';
import styled from 'styled-components';

import { numberWithCommas } from '../util';

const TableContainer = styled.div`
   background-color: #d4e2d4;
   border-radius: 1rem;
   padding: 0.3rem 0.3rem 0.3rem 0.3rem;
   height: 30vh;
   margin: .5rem 0 1rem 0;
   border-spacing: 1rem 0;
   overflow: scroll;
   
   ::-webkit-scrollbar {
      display: block;
      width: .7rem;
      height: 0;
   }
   ::-webkit-scrollbar-thumb {
      background-color: #6f9eaf;
   }

   th {
      font-size: 1.3rem;
      padding-bottom: 1rem;
   }
   tr {
      display: flex;
      justify-content: space-between;
   }
   td {
      padding: 0.3rem;
   }
`;

function Table(props) {
   const countries = props.data;

   return (
      <div>
         <TableContainer>
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
         </TableContainer>
      </div>
   )
}

export default Table;
