const service = require("./tables.services")
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')

function hasData(req, res, next) {
    if (req.body.data) {
      return next();
    }
    next({ status: 400, message: "Body must have data property." });
  }

function hasTableName(req, res, next){
    if (req.body.data.table_name){
        return next()
    }
    next({
        status: 400, message: "table_name is required."
    })
}

function hasCapacity(req, res, next){
    if (req.body.data.hasCapacity){
        return next()
    }
    next({
        status: 400, message: "capacity is required."
    })
}

async function create(req, res) {
    const table = req.body.data;
    const data = await service.create(table);
    res.status(201).json({ data: data});
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
        hasCapacity, 
        asyncErrorBoundary(create),
    ],
  };