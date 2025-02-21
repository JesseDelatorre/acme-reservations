const client = require('./client.js');

const createReservation = async(reservationDate, partyCount, restaurantId, customerId) => {
  try{
await client.query(`
 INSERT INTO reservations (date, party_count, rest_id, cust_id)
 VALUES ( '${reservationDate}', ${partyCount}, ${restaurantId}, ${customerId})
  `);
  }catch(err){
    console.log(err)
  }
}
module.exports = {
  createReservation
}


// a way to get the date for reservations
// const reservationDate = new Date(2025, 1, 22).toISOString().slice(0,10)