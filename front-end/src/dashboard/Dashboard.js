import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import useQuery from "../utils/useQuery";
import ErrorAlert from "../layout/ErrorAlert";
import TableInformation from "../tables/new/TableInformation";
import ReservationInformation from "../reservations/new/ReservationInformation";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([])
  const [reservationsError, setReservationsError] = useState(null);
  const [tablesError, setTablesError] = useState(null)

  useEffect(loadReservation, [date]);
  useEffect(loadTables, []);

  function loadReservation() {
    console.log("load reservation", reservations)
    const abortController = new AbortController();
    setReservationsError(null);

    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    return () => {abortController.abort();};
  }

  async function loadTables(){
    console.log("here")
    const abortController = new AbortController();
    setTablesError(null);
    try{
    const tableResult = await listTables(abortController.signal);
    setTables(tableResult)
    }
    catch(error){
      setTablesError(error)
    }
    return () => abortController.abort();

  }



  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date: {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {/* {JSON.stringify(reservations)}
      <table>
        <tr>
          <th scope="col">  Reservation ID  </th>
          <th scope="col">  First Name</th>
          <th scope="col">  Last Name  </th>
          <th scope="col">  Mobile Number  </th>
          <th scope="col">  Reservation Date  </th>
          <th scope="col">  Reservation Time  </th>
          <th scope="col">  Status  </th>
          <th scope="col">  Seat  </th>
        </tr>
      </table>
      <Link to={`/reservations/${reservations.reservation_id}/seat`}>
        <button>Seat</button>
      </Link> */}
      <ReservationInformation reservations={reservations}/>
      <TableInformation table={tables}/>
    </main>
  );
}

export default Dashboard;
