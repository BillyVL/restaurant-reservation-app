const knex = require('../db/connection')

function list(){
    return knex('reservations')
        .select('*')
}

function listForDate(date){
    return knex("reservations")
        .select("*")
        .where({reservation_date: date})
        .orderBy("reservation_time")
}

function search(mobile_number) {
       return knex("reservations")
         .whereRaw(
           "translate(mobile_number, '() -', '') like ?",
           `%${mobile_number.replace(/\D/g, "")}%`
        )
         .orderBy("reservation_date");
     }

function read(reservation_id){
    return knex("reservations")
        .select("*")
        .where({reservation_id})
        .first();
}

function create(newReservation){
    return knex('reservations')
        .insert(newReservation)
        .returning("*")
        .then((newReservation) => newReservation[0]);
}

module.exports = {
    list,
    listForDate,
    search,
    read,
    create,
}