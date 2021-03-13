import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

import styled from 'styled-components';

const LineStyle = styled.div`
   margin: 1rem;
`;

const casesTypeColors = {
   cases: {
     hex: "#CC1034",
   },
   recovered: {
     hex: "#70af85",
   },
   deaths: {
     hex: "#433d3c",
   },
 };


const options = {
   animation: {
      duration: 1000,
      easing: 'linear',
   },
   scales: {
      xAxes: [
         {
            type: "time",
            time: {
               format: "MM/DD/YY",
            },
            scaleLabel: {
               display: true,
               labelString: 'Timeline'
            },
         },
      ],
      yAxes : [
         {
            gridLines : { 
               display: false, 
            },
            ticks: {
               autoSkip: false,
               min: 0,
               max: 300000000,
               callback: (value) => {
                  return numeral(value).format("0.0 a");
               },
            },
            scaleLabel: {
               display: true,
               labelString: '# of People'
            }
         }
      ]
   },
   elements: {
      point: {
        radius: 0,
      },
    },
   title:{
      display: true,
      text: 'WorldWide Cases',
      fontSize: 25
   },
   legend:{
      display: true,
      position: 'right'
   }
}

const keyValue_Helper = (data, casesType) => {
   let newData = [];
   let labels = {};
   // console.log(data);
   for(let date in data["cases"]) {
      // alert(date);
      // alert(data.cases[date]);

      //  grab the key, value pair
      labels = {
         // dates are same for all type of cases 
         x: date,
         // y: data['cases'][date],
         y: data[casesType][date],
      };
      newData.push(labels);
      // console.log(newData);
   }
   return newData;
}

function CovidGraph(props) {
   const [graphData, setGraphData] = useState({});
   /*
  * These info are for the graph
  *     The data consists of all the number of cases since April 2019
  */
   useEffect(() => {
      const getHistory = async () => {
         await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=400")
         .then((res) => res.json())
         .then((data) => {
            // since the data that is coming is an object, we need to take it out of the object and make it an array of data
            /*{
               "cases": {
                  "1/22/20": 555,                      [
                  "1/23/20": 654,                       { x: "1/22/20",
                  "1/24/20": 941,                         y: 555,
                  ...               =======>            } 
                                                        { x: "1/23/20"
                                                          y: 654,
                                                        } 
                                                        ... ]                                        
            */
            // console.log(data[props.casesType]);
            let newData = keyValue_Helper(data, props.casesType);
            setGraphData(newData);
         });
      };
      getHistory();
   }, [props.casesType])            // need [casesType] so that we can get new data everytime the info cards are clicked


   return (
      <LineStyle>
         {
            graphData?.length > 0 && (
               <Line
                  data={{
                     // labels: ['July 2019', 'December 2019', 'April 2020',
                     // 'August 2020', 'December 2020', 'April 2021'],
                     datasets: [
                        {
                           label: 'Cases',
                           fill: true,
                           // lineTension: 0.8,
                           // backgroundColor: 'rgba(75,192,192,1)',
                           backgroundColor: casesTypeColors[props.casesType].hex,
                           borderColor: 'rgba(0,0,0,1)',
                           borderWidth: 2,
                           data: graphData,
                        }
                     ]
                  }}
                  options={ options }
               />
            )
         }
      </LineStyle>
   )
}

export default CovidGraph
