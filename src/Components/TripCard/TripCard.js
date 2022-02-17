import './TripCard.scss';
import Earth from '../../assets/ft_earth.png'
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';


const TripCard = ({  tripName, createdBy, budget, dates }) => {
  
  // const generateDates = () => {
  //   if(dates.length) {

  //     const allDates = dates.map((dateRange) => {
  //       const startDate = new Date(dateRange.start_date).toDateString();
  //       const endDate = new Date(dateRange.end_date).toDateString();
  //       return (
  //         <p key={Math.floor(Math.random() * Date.now())} className="date">{startDate} - {endDate}</p>
  //       )
  //     })
  //     return allDates;
  //   } else {
  //     return
  //   }
  // }

  return (
    (
      <article className="trip-card">
        {/* <img className="trip-card-img" src={Earth}/> */}
        <div className="trip-card-txt">
          <h1>{tripName}</h1>
          <p>Created By: {createdBy}</p>
          <p>Proposed Budget: ${budget}</p>
          <p>Possible dates:</p>
          {/* {generateDates()} */}
        </div>
      </article>
    )
  )


}


export default TripCard