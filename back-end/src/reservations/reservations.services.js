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
    read,
    create,
}