import React, { useState } from "react"
import { listReservations } from "../../utils/api"



function ReservationSearch(){

const [reservations, setReservations] = useState(null)
const [mobile_number, setMobileNumber] = useState('')    
const [error, setError] = useState(null)

const handleSubmit = (event) =>{
    event.preventDefault()
    setError(null)
    listReservations({mobile_number})
        .then(setReservations)
        .catch(setError)
    console.log("these reservations", reservations)
    return () => AbortController.abort();
}

const resRow = reservations?.map((reservation) => {
    return (
        <tr key={reservation.reservation_id}>
        <td>{reservation.reservation_id}</td>
        <td>{reservation.first_name}</td>
        <td>{reservation.last_name}</td>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.reservation_time}</td>
        <td>{reservation.people}</td>

        </tr>
    )
})

return (
    
    <div>
        <div>
            <h2>Find your reservation!</h2>
        </div>
        
        <form onSubmit={handleSubmit}>
            <input
                id="mobile_number"
                name="mobile_number"
                type="text"
                placeholder="Enter a customer's phone number"
                onChange={(event) => setMobileNumber(event.target.value)}
                value={mobile_number}
            />
            <button className="submit=btn" type='submit'>Find</button>
        </form>
        
        {Object.keys(reservations).length > 0 ?
        <div>
            <h3>Found Reservations</h3>
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
                </tr>
                <tbody>{resRow}</tbody>
            </table>
        </div>
    
        :
        <div>
            <p>No reservations found.</p>
        </div>
        }
        
    </div>
    )
}



export default ReservationSearch

