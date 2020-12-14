import React from 'react'
import styled from 'styled-components';

const InfoStyle = styled.div`
   display: flex;
   flex-direction: column;
   height: 4rem;
   width: 4rem;
   background-color: grey;
`;

function Info(props) {
   return (
      <InfoStyle>
         {
            props.title
         }
         <h1>{props.case} </h1>
      </InfoStyle>
   )
}

export default Info
