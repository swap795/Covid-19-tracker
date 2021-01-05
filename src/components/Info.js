import React, { useState } from 'react';
import numeral from 'numeral';

import styled from 'styled-components';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';


const useStyle = makeStyles((theme) => ({
   card: {
      padding: '0 1rem 0 0.5rem',
      borderRadius: '1rem',
      margin: '0.5rem',

      // this is material-ui version of responsive design
      [theme.breakpoints.down('sm')]: {
         padding: '0',
         margin: '0',
      },

      [theme.breakpoints.down('xs')]: {
         padding: '0',
      }
   },

   texts: {
      [theme.breakpoints.down('xs')]: {
         fontSize: '1rem',
      }
   }
}))

const H2Style = styled.h2`
   margin: .3rem .0 .3rem 0;
`;

const HoverContainer = styled.div`
   cursor: pointer;
   &:hover {
      filter: brightness(75%);            // using this to make it change the brightness when hovered on the Info Cards
   }
`;

function Info(props) {
   const classes = useStyle();

   return (
      <HoverContainer onClick={ props.onClick }>
         <Card className={ classes.card } style={ props.style }>
            <CardContent>
               <Typography className= { classes.texts } color="white"><b>{ props.title }</b></Typography>
               <H2Style className= { classes.texts } >{ numeral(props.case).format('0,0') }</H2Style>
               <Typography className= { classes.texts } color="textSecondary white">{ numeral(props.total).format('0,0') } is <b>Total</b></Typography>
            </CardContent>
         </Card>
      </HoverContainer>
   )
}

export default Info
