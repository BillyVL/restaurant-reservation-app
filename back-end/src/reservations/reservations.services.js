const knex = require('../db/connection')

function list(){
    return knex('reservations')
        .select('*')
}

function create(newReservation){
    return knex('reservations')
        .insert(newReservation)
}

module.exports = {
    list,
    create,
}