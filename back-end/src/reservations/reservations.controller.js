const service = require("./reservations.services")
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')

function hasData(req, res, next) {
  if (req.body.data) {
    return next();
  }
  next({ status: 400, message: "Body must have data property." });
}

function hasFirstName(req, res, next) {
  if (req.body.data.first_name) {
    return next();
  }
  next({ status: 400, message: "first_name is required." });
}

function hasLastName(req, res, next) {
  if (req.body.data.last_name) {
    return next();
  }
  next({ status: 400, message: "last_name is required." });
}

function hasMobileNumber(req, res, next) {
  if (req.body.data.mobile_number) {
    return next();
  }
  next({ status: 400, message: "mobile_number is required." });
}

function hasReservationDate(req, res, next) {
  let reservationDate = req.body.data.reservation_date;
  const reservationDateObject = new Date(reservationDate);
  if (reservationDate && reservationDateObject.getDate()) {
    return next();
  }
  next({ status: 400, message: "reservation_date is required." });
}

function hasReservationTime(req, res, next) {
  let reservationTime = req.body.data.reservation_time;

  if (reservationTime && isValidTimeString(reservationTime)) {
    console.log("good", reservationTime)
    return next();
  }

  next({ status: 400, message: "reservation_time is required." });
}

function isValidTimeString(timeString) {
  const timeReg = /^([0-5][0-9]):([0-5][0-9])$/;
  return timeReg.test(timeString);
}

function hasReservationPeople(req, res, next) {
  console.log("people function was hit")
  let people = req.body.data.people;
  if (people && people > 0 && typeof people === "number") {
    return next();
  }

  next({ status: 400, message: "people are required." });
}

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const { date } = req.query;

  if (date) {
    const data = await service.listForDate(date);
    res.json({ data });
  }
  else{

  const data = await service.list();
  res.json({ data });
  }
}

async function create(req, res) {
  console.log(req, res);
  // req.body.data
  // call the service create function
  const reservation = req.body.data;
  const data = await service.create(reservation);
  console.log(data);
  res.status(201).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasData,
    hasFirstName,
    hasLastName,
    hasMobileNumber,
    hasReservationDate,
    hasReservationTime,
    hasReservationPeople,
    asyncErrorBoundary(create)
  ],
};

/*   {
    "first_name": "Rick",
    "last_name": "Sanchez",
    "mobile_number": "202-555-0164",
    "reservation_date": "2020-12-31",
    "reservation_time": "20:00:00",
    "people": 6,
    "created_at": "2020-12-10T08:30:32.326Z",
    "updated_at": "2020-12-10T08:30:32.326Z"
  }, */
