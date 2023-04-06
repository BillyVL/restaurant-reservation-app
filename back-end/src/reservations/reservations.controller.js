const service = require('./reservations.services')

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  res.json({
    data: [],
  });
}

async function create(req, res){
  // req.body.data
  // call the service create function
  const reservation = req.body.data
  const data = await service.create(reservation)
  res.status(201).json({data})
}

module.exports = {
  list,
  create,
};
