// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("../lib/db");
const db = new Pool(dbParams);
db.connect();


const searchSelector = async (min, max, type) => {
  console.log('dbmin', min);
  console.log('dbmax', max);
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

const getCorrespondenceEmails = async() => {
  const emails = await db.query(`SELECT `);
  return emails.rows;
};

module.exports = {
  searchSelector,
  getUsers,
  getUserByEmail,
  getCorrespondenceEmails,

};
