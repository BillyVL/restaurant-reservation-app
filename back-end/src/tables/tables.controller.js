const service = require("./tables.services")
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')

function hasData(req, res, next) {
    if (req.body.data) {
      return next();
    }
    next({ status: 400, message: "Body must have data property." });
  }

function hasTableName(req, res, next){
    let tableName = req.body.data.table_name;
    if (tableName){
        return next()
    }
    next({
        status: 400, message: "table_name is required."
    })
}

function oneCharTable(req, res, next){
  let tableName = req.body.data.table_name;
  if (tableName.length >= 2){
    return next()
  }
  next({
    status: 400, message: "table_name needs to be greater than one character."
  })
}

function hasCapacity(req, res, next){
    if (req.body.data.capacity){
        return next()
    }
    next({
        status: 400, message: "capacity is required."
    })
}

function isCapacityNum(req, res, next){
  if (typeof req.body.data.capacity === 'number'){
    return next()
  }
  next({
    status: 400, message: "capacity needs to be a number."
  })
}

function hasResID(req, res, next){
  if(req.body.data.reservation_id){
    return next()
  }
  next({
    status: 400, message: "reservation_id is missing"
  })
}

async function resIDExists(req, res, next){
  const reservation = await service.readReservation(req.body.data.reservation_id);
  if (reservation){
    return next()
  }
  next({
    status: 404, message: `this reservation_id ${req.body.data.reservation_id} does not exist.`
  })
}

function hasSufficientCap(req, res, next){
  const {reservation, table} = res.body.data
  console.log("looky here", reservation.people, table.capacity);
  if(reservation.people <= table.capacity){
    return next()
  }
  next({
    status: 400, message: "this table does not suit the capacity."
  })
}



//CRUD FUNCTIONS

async function tableExists(req, res, next){
  const table = await service.readTable(req.params.table_id);
  if (table){
    return next()
  }
  next({
    status: 404, message: "this table does not exists."
  })
}

async function create(req, res) {
    const table = req.body.data;
    const data = await service.create(table);
    res.status(201).json({ data: data});
  }

async function read(req, res){
  const data = res.locals.table;
  res.json({data})
}

async function update(req, res){
  const {table_id, reservation_id} = res.locals
  const data = await service.updateSeat(reservation.reservation_id, table.table_id);
  res.json({data})
  
}

async function destroy(req, res) {
  const table = res.locals.table;
  const data = await service.destroyTable(table.table_id, table.reservation_id);
  res.json({data});
}

async function list(req, res){
    const data = await service.list()
    res.json({data})
}



  

  module.exports = {
    list: asyncErrorBoundary(list), 
    create: [
      hasData,
      hasTableName,
      oneCharTable,
      hasCapacity, 
      isCapacityNum,
      asyncErrorBoundary(create),
    ],
     read: [
      asyncErrorBoundary(tableExists),
      asyncErrorBoundary(read),
    ],
    update: [
      asyncErrorBoundary(tableExists),
      hasData,
      hasResID,
      asyncErrorBoundary(resIDExists),
      hasCapacity,
      isCapacityNum,
      hasSufficientCap,
      asyncErrorBoundary(update),
    ],
    destroy: [
      asyncErrorBoundary(tableExists),
      asyncErrorBoundary(destroy),
    ], 
  };