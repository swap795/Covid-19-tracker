import React from 'react'
import styled from 'styled-components';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';

import '../styles/Info.css';


const useStyle = makeStyles({
   card: {
      paddingRight: '5rem',
   }
})

function Info(props) {
   const classes = useStyle();

   return (
      <div>
         <Card className={ classes.card }>
            <CardContent>
               <Typography color="textPrimary">{ props.title }</Typography>
               <h2>{ props.case }</h2>
               <Typography color="textSecondary">{ props.total } Total</Typography>
            </CardContent>
         </Card>
      </div>
   )
}

export default Info
