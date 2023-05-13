import React, { useState } from "react";
import { useHistory } from "react-router";
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

  const history = useHistory();

  const handleSubmit = async (event) => {
    console.log("You clicked Submit");
    event.preventDefault();
    const abortController = new AbortController();
    reservation.people = Number(reservation.people);
    reservation.reservation_date = new Date(reservation.reservation_date);
    reservation.reservation_time = new Date(reservation.reservation_time);

    console.log(reservation);

    try {
      await createReservation(reservation, abortController.signal)
        .then((data) => {
          console.log(data);

          history.push(`/dashboard?date=${data.reservation_date}`)
        })
        .catch(setError);
    } catch (error) {
      console.log("error here: ", error);
    }

    //abortController
    //API call
    //history will need createReservation API to get reservation data
  };

  //if (error){return <h1>Error</h1>}

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CreateReservationForm
          reservation={reservation}
          setReservation={setReservation}
        />
      </form>
    </div>
  );
}

export default CreateReservation;
