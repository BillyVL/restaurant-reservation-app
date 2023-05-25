import React, { useState } from "react";
import { useHistory } from "react-router";
import CreateReservationForm from "./CreateReservationForm";
import { createReservation } from "../../utils/api";
import ErrorAlert from "../../layout/ErrorAlert";
import { formatAsDate } from "../../utils/date-time"
import { formatReservationDate } from "../../utils/format-reservation-date"

function CreateReservation() {
  const [error, setError] = useState(null);
  const [reservation, setReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "1",
  });

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    reservation.people = Number(reservation.people);
    
    const dateAsString = reservation.reservation_date;

    reservation.reservation_date = new Date(reservation.reservation_date);
    
    createReservation(reservation, abortController.signal)
        .then((data) => {
          history.push(`/dashboard?date=${dateAsString}`)
        })
        .catch(setError);
      return () => abortController.abort();

    //abortController
    //API call
    //history will need createReservation API to get reservation data
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ErrorAlert error = {error}/>
        <CreateReservationForm
          reservation={reservation}
          setReservation={setReservation}
        />
      </form>
    </div>
  );
}

export default CreateReservation;
