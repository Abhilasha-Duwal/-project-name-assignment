const sqlite3 = require("sqlite3").verbose();
const filepath = "./db/test.db";

const DbConnection = () => {
  const db = new sqlite3.Database(filepath, (error) => {
    if (error) {
      throw new Error(
        `Failed to establish connection with SQLite: ${error.message}`
      );
    }
    console.log("Connection with SQLite has been established");
  });
  return db;
};

module.exports = { DbConnection };
