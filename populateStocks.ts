const mysql = require('mysql2'); // Use mysql2 instead of mysql
const dotenv = require('dotenv');
dotenv.config();

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.mysql_host,
  port: 3306,
  user: process.env.mysql_user,
  password: process.env.mysql_password,
  database: process.env.mysql_database,
});

// Initialize DataSource
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }

  console.log('Connected to MySQL');

  // Define the data to be inserted
  const stockdata = {
    testStock: 1000,
    testStock2: 2000,
    testStock3: 3000,
  };

  // Define SQL query to insert data into the StockData table
  const insertQuery = `
    INSERT INTO stock_data ( stocks) VALUES (?, ?)
  `;

  // Execute the insert query
  connection.query(
    insertQuery,
    [stockdata, JSON.stringify(stockdata)],
    (err: Error) => {
      if (err) {
        console.error('Error inserting data:', err);
        connection.release();
        return;
      }

      console.log('Data inserted successfully');

      // Release the connection
      connection.release();
    },
  );
});
