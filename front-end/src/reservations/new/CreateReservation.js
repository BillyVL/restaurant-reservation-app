import React, { useState } from "react";
import { useHistory } from "react-router"
import CreateReservationForm from "./CreateReservationForm";
import { createReservation } from "../../utils/api";

function CreateReservation() {

  const [error, setError] = useState({});
  const [reservation, setReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "1",
  });

  /*   {
    "first_name": "Rick",
    "last_name": "Sanchez",
    "mobile_number": "202-555-0164",
    "reservation_date": "2020-12-31",
    "reservation_time": "20:00:00",
    "people": 6,
    "created_at": "2020-12-10T08:30:32.326Z",
    "updated_at": "2020-12-10T08:30:32.326Z"
  }, */

  const history = useHistory()

  const handleSubmit = (event) => {
    console.log("You clicked Submit");
    event.preventDefault();
    const abortController = new AbortController()
    reservation.people = Number(reservation.people);
    createReservation(reservation, abortController.signal)
      .then(data => {console.log(data)})
      .catch(setError)  
    //abortController
    //API call
    //history will need createReservation API to get reservation data
    history.push(`/dashboard?date=${reservation.reservation_date}`)
  };

  //if (error){return <h1>Error</h1>}

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <CreateReservationForm reservation = {reservation} setReservation = {setReservation}/>
      </form>
    </div>

  )

}

export default CreateReservation;
