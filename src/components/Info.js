import React, { useState } from 'react';
import numeral from 'numeral';

import styled from 'styled-components';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';


const useStyle = makeStyles({
   card: {
      paddingRight: '4rem',
      borderRadius: '1rem',
      margin: '1rem',
   }
})

const H2Style = styled.h2`
   margin: .3rem .0 .3rem 0;
`;

const HoverContainer = styled.div`
   cursor: pointer;
   &:hover {
      filter: brightness(75%);            // using this to make it change the brightness on hover
   }
`;

function Info(props) {
   const classes = useStyle();

   return (
      <HoverContainer onClick={ props.onClick }>
         <Card className={ classes.card } style={ props.style }>
            <CardContent>
               <Typography color="white"><b>{ props.title }</b></Typography>
               <H2Style>{ numeral(props.case).format('0,0') }</H2Style>
               <Typography color="textSecondary white">{ numeral(props.total).format('0,0') } is <b>Total</b></Typography>
            </CardContent>
         </Card>
      </HoverContainer>
   )
}

export default Info
