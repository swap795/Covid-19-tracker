import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction}  from '@material-ui/core';

// icons 
import EmailIcon from '@material-ui/icons/Email';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';


const useStyles = makeStyles({
   root: {
      // height: '15%',
      // width: '30%',
      backgroundColor: '#424242',
      margin: 'auto',
      position: '-webkit-sticky', /* Safari */
      position: 'sticky',
   },

   buttonsContainer: {
      backgroundColor: '#bbbbbb', 
      position: 'relative',
      borderRadius: '1rem',
   }
});

const FooterStyle = styled.div`
   h4 {
      margin-top: 5%;
      color: white;
   }
`;


function Footer() {
   const classes = useStyles();
   return (
      <BottomNavigation className={classes.root}>
         <FooterStyle>
            <h4>Thanks for visiting the site.</h4>
            <br/>
            <BottomNavigationAction className={classes.buttonsContainer} label="LinkedIn" value="LinkedIn" icon={ <LinkedInIcon /> }/>
         </FooterStyle>
      </BottomNavigation>
   )
}

export default Footer
