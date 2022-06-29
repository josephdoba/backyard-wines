// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("../lib/db");
const db = new Pool(dbParams);
db.connect();


const searchSelector = async (min, max, type, award) => {
  console.log('dbmin', min);
  console.log('dbmax', max);
  console.log('award', award);
  const queryParams = [];
  let queryString = `SELECT * FROM wine_listings WHERE TRUE`;

  if (min) {
    queryParams.push(min);
    queryString += ` AND price >=  $${queryParams.length}`;
  }
  if (max) {
    queryParams.push(max);
    queryString += ` AND price <=  $${queryParams.length}`;
  }
  if (type) {
    queryParams.push(type);
    queryString += ` AND wine_type = $${queryParams.length}`;
  }
  if (award) {
    queryParams.push(award);
    queryString += ` AND award = $${queryParams.length}`;
  }

  const result = await db.query(queryString, queryParams);

  return result.rows;

};

// const getAllWines = async () => {
//   const result = await db.query(`SELECT * FROM wine_listings`);
//   // console.log("result", result);
//   return result.rows;
// };
// const getAllRedWines = async () => {
//   const result = await db.query(`SELECT * FROM wine_listings WHERE wine_type='Red'`);
//   return result.rows;
// };
// const getAllWhiteWines = async () => {
//   const result = await db.query(`SELECT * FROM wine_listings WHERE wine_type='White'`);
//   return result.rows;
// };

// const result = await db.query(
//   `SELECT * FROM wine_listings WHERE price > $1 AND price < $2`, [min, max]
// );
// return result.rows;


// const redSearch = async (min, max) => {
//   const result = await db.query(
//     `SELECT * FROM wine_listings WHERE wine_type='Red' AND price BETWEEN $1 AND $2`, [min, max]
//   );
//   return result.rows;
// };

// const whiteSearch = async (min, max) => {
//   const result = await db.query(
//     `SELECT * FROM wine_listings WHERE wine_type='White' AND price BETWEEN $1 AND $2`, [min, max]
//   );
//   return result.rows;
// };



const getUsers = async (userID) => {
  const result = await db.query(`SELECT * FROM users
  WHERE id = $1`, [userID]);
  return result.rows;
};


const getUserByEmail = async (email) => {
  const result = await db.query(`SELECT * FROM users
  WHERE email = $1`, [email]);
  // console.log('RESULT IS', result);
  return result.rows[0];
};

const getUserEmailByID = async() => {
  const result = await db.query(`SELECT email from users
  WHERE id = 6;`);
  return result.rows;
};

const getSellerEmailByID = async() => {
  const result = await db.query(`SELECT email from users
  WHERE id = 5;`);
  return result.rows;
};


module.exports = {
  searchSelector,
  getUsers,
  getUserByEmail,
  getUserEmailByID,
  getSellerEmailByID

};
