// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("../lib/db");
const db = new Pool(dbParams);
db.connect();

const getAllWines = async() => {
  const result = await db.query(`SELECT * FROM wine_listings`);
  // console.log("result", result);
  return result.rows;
};
const getAllRedWines = async() => {
  const result = await db.query(`SELECT * FROM wine_listings WHERE wine_type='Red'`);
  return result.rows;
};
const getAllWhiteWines = async() => {
  const result = await db.query(`SELECT * FROM wine_listings WHERE wine_type='White'`);
  return result.rows;
};


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
  getAllWines,
  getAllRedWines,
  getAllWhiteWines,
  getUsers,
  getUserByEmail,
  getCorrespondenceEmails

};
