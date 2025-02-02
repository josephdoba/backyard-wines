/* eslint-disable camelcase */
// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("../lib/db");
const db = new Pool(dbParams);
db.connect();


const searchSelector = async(min, max, type, award) => {
  console.log('dbmin', min);
  console.log('dbmax', max);
  console.log('award', award);
  const queryParams = [];
  let queryString = `SELECT * FROM wine_listings WHERE sold_out = false`;

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



const getUsers = async(userID) => {
  const result = await db.query(`SELECT * FROM users
  WHERE id = $1`, [userID]);
  return result.rows;
};


const getUserByEmail = async(email) => {
  const result = await db.query(`SELECT * FROM users
  WHERE email = $1`, [email]);
  // console.log('RESULT IS', result);
  return result.rows[0];
};

const getUserEmailByID = async () => {
  const result = await db.query(`SELECT email from users
  WHERE id = 6;`);
  return result.rows;
};

const getWineriesListings = async (id) => {
  const result = await db.query(
    `SELECT wine_listings.* FROM wine_listings JOIN users ON users.id = wine_listings.user_id WHERE users.id=$1;`,
    [id]
  );
  return result.rows;
};

const getSellerEmailByID = async () => {
  const result = await db.query(`SELECT email from users
  WHERE id = 5;`);
  return result.rows;
};

const setToSoldout = async(id) => {
  const result = await db.query(`UPDATE wine_listings SET sold_out = true WHERE id=$1`, [id]);
};

const removeListing = async (id) => {
  const result = await db.query(`DELETE FROM wine_listings WHERE id=$1`, [id]);
};

const addToFavorites = async(listingId) => {
  const result = await db.query(`
    INSERT INTO favorites(user_id, listing_id, favorite)
    VALUES (6, $1, true);`, [listingId]);
  return result;
};

const loadFavorites = async(id) => {
  const result = await db.query(`
    SELECT wine_listings.* FROM wine_listings
    JOIN favorites ON favorites.listing_id = wine_listings.id
    WHERE favorites.user_id = $1;
  `, [id]);

  return result.rows;
};

const checkIfFavoriteExists = async(id) => {
  const result = await db.query(`
    SELECT wine_listings.id FROM wine_listings
    JOIN favorites ON favorites.listing_id = wine_listings.id
    WHERE favorites.user_id = $1;
 `, [id]);

  return result.rows;
};

const addWineListing = async (
  user_id,
  price,
  year,
  wine_name,
  winery,
  award,
  wine_type,
  description,
  wine_image_url,
  winery_image_url
) => {
  const result = await db.query(
    `Insert into wine_listings
  (user_id, price, year, wine_name, winery, award, wine_type, description, wine_image_url, winery_image_url)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  RETURNING *;`,
    [
      user_id,
      price,
      year,
      wine_name,
      winery,
      award,
      wine_type,
      description,
      wine_image_url,
      winery_image_url
    ]
  );
  return result.rows;
};

module.exports = {
  searchSelector,
  getUsers,
  getUserByEmail,
  getWineriesListings,
  getUserEmailByID,
  getSellerEmailByID,
  setToSoldout,
  removeListing,
  addToFavorites,
  loadFavorites,
  checkIfFavoriteExists,
  addWineListing

};
