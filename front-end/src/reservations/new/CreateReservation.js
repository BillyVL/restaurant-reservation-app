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

  const history = useHistory();

  const handleSubmit = async (event) => {
    console.log("You clicked Submit");
    event.preventDefault();
    const abortController = new AbortController();
    reservation.people = Number(reservation.people);
    console.log(reservation.reservation_date);
    reservation.reservation_date = new Date(reservation.reservation_date);
/*     console.log(reservation.reservation_time);
    reservation.reservation_time = new Date(reservation.reservation_time); */

    createReservation(reservation, abortController.signal)
        .then((data) => {
          console.log(data);

          history.push(`/dashboard?date=${data.reservation_date}`)
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
