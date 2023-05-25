const knex = require('../db/connection')

function list(){
    return knex('reservations')
        .select('*')
}

function listForDate(date){
    console.log(date);
    return knex("reservations")
        .select("*")
        .where({reservation_date: date})
        .orderBy("reservation_time")
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
    create,
}