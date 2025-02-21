const client = require('./client.js');
const { createCustomer, getAllCustomers } = require('./customers.js');
const { createRestaurant, getAllRestaurants } = require('./restaurants.js');
const { createReservation, deleteReservations } = require('./reservations.js');

const dropTables = async() => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS reservations;
      DROP TABLE IF EXISTS customers;
      DROP TABLE IF EXISTS restaurants;
    `)
  } catch(err) {
    console.log(err)
  }
}

const createTable = async() => {
  try {
    await client.query(`
   CREATE TABLE customers (
   id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL
  );

  CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL
  );

  CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  party_count INTEGER NOT NULL,
  rest_id INTEGER REFERENCES restaurants(id) NOT NULL,
  cust_id INTEGER REFERENCES customers(id) NOT NULL
  );
  `);
  } catch (err) {
    console.log(err);
  }

};

const syncAndSeed = async() => {
  try{
    console.log('connecting to db');
      await client.connect();
    console.log('connected to db');

    console.log('Dropping Tables');
      await dropTables();
    console.log('tables dropped');

    console.log('creating tables');
      await createTable();
    console.log('table created');

    console.log('creating customers');
     const john = await createCustomer('John Smith');
     const adam = await createCustomer('Adam Zapple');
     const dora = await createCustomer('Dora');
     const paul = await createCustomer('Paul');
    console.log('customers created');

    console.log('creating restaurant');
      const oliveGarden = await createRestaurant('Olive Garden');
      const spaghettiTown = await createRestaurant('Spaghetti Town');
      const tacoTuesdays = await createRestaurant('Taco Tuesdays');
      const sushiVillage = await createRestaurant('Sushi Village');
      const cityWok = await createRestaurant('City Wok');
    console.log('retraunt created');

    console.log('creating reservation');
    await createReservation('2025-02-22', 4, oliveGarden.id, john.id);
    await createReservation('2025-03-01', 2, spaghettiTown.id, john.id);
    await createReservation('2025-02-25', 3, oliveGarden.id, adam.id);
    await createReservation('2025-02-22', 5, sushiVillage.id, dora.id);
    await createReservation('2025-03-03', 3, sushiVillage.id, dora.id);
    console.log('reservation created');
     
    const getCustomers = await getAllCustomers();
    const getRestaurants = await getAllRestaurants();
    const deletingReservation = await deleteReservations();
    
    await client.end();
    console.log('connection D/C');
  }catch(err) {
    console.log(err);
  }
}

syncAndSeed();

