import React from 'react';
import numeral from 'numeral';

import styled from 'styled-components';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';


const useStyle = makeStyles({
   card: {
      paddingRight: '4rem',
      borderRadius: '1rem',
   }
})

const H2Style = styled.h2`
   margin: .3rem .0 .3rem 0;
`;

function Info(props) {
   const classes = useStyle();

   return (
      <div>
         <Card className={ classes.card }>
            <CardContent>
               <Typography color="textPrimary">{ props.title }</Typography>
               <H2Style>{ numeral(props.case).format('0,0') }</H2Style>
               <Typography color="textSecondary">{ numeral(props.total).format('0,0') } Total</Typography>
            </CardContent>
         </Card>
      </div>
   )
}

export default Info
