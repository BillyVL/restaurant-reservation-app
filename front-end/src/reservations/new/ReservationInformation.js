import React, {useState} from "react"
import { Link } from "react-router-dom"

function ReservationInformation({reservations}){


const resRow = reservations.map((reservation) => {
    console.log("herehehe", reservation)
    if(reservation.status === null){
        reservation.status = 'booked'
    }
    if (reservation.status !== "finished"){
    return (
        <tr key={reservation.reservation_id}>
        <td>{reservation.reservation_id}</td>
        <td>{reservation.first_name}</td>
        <td>{reservation.last_name}</td>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.reservation_time}</td>
        <td>{reservation.people}</td>
        <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
        <td>
            {reservation.status === 'booked' ?
            <Link to={`/reservations/${reservation.reservation_id}/seat`}>
            <button>Seat</button>
            </Link>
            :
            <>
            </>
        }
        
        </td>

        </tr>
    )}
})

if (!reservations){
    return (
        <div>No reservations currently.</div>
    )
}

return (
    <div>
        <table>
        <tr>
          <th scope="col">  Reservation ID  </th>
          <th scope="col">  First Name</th>
          <th scope="col">  Last Name  </th>
          <th scope="col">  Mobile Number  </th>
          <th scope="col">  Reservation Date  </th>
          <th scope="col">  Reservation Time  </th>
          <th scope="col">  People  </th>
          <th scope="col">  Status  </th>
          <th scope="col">  Seat  </th>
        </tr>
        <tbody>{resRow}</tbody>
      </table>
    </div>
)

}

export default ReservationInformation