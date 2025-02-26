const client = require('./client.js');

const createRestaurant = async(restaurantName) => {
  try {
    const { rows } = await client.query(`
    INSERT INTO restaurants (name)
    VALUES ('${restaurantName}')
    RETURNING *;
    `);
    const restaurant = rows[0];
    return restaurant;
  } catch (err) {
    console.log(err);
  }
}
const getAllRestaurants = async() => {
  try{
const { rows: retrievedRestaurants } = await client.query(`
  SELECT * FROM  restaurants;
  `);
  return retrievedRestaurants;
  }catch(err) {
    console.log(err)
  }
}
module.exports = {
  createRestaurant,
  getAllRestaurants
};