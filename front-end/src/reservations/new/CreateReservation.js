import React, { useState } from "react";
import { useHistory } from "react-router";
import CreateReservationForm from "./CreateReservationForm";
import { createReservation } from "../../utils/api";
import ErrorAlert from "../../layout/ErrorAlert";

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

  function handleSubmit(event){
    event.preventDefault();
    const abortController = new AbortController();
    reservation.people = Number(reservation.people);
    
    const dateAsString = reservation.reservation_date;
    const isValidMobile = /^[\d-]+$/.test(reservation.mobile_number)
    if (!isValidMobile){
      setError({message: 'mobile_number can only contain numbers'})
      return;
    }

    if (reservation.mobile_number.length === 10 && !reservation.mobile_number.includes("-")) {
      reservation.mobile_number = reservation.mobile_number.replace(/^(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
    }
    
    createReservation(reservation, abortController.signal)
        .then((data) => {
          history.push(`/dashboard?date=${dateAsString}`)
        })
        .catch(setError);
      return () => abortController.abort();

    
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
