const { Pool }=require("pg");


// const client=new Client({
//     user: "uuyhzdltyysaxr",
//     password: "74422a6d807e0e655c996a50cc167341c3c947e22e61d6aa3f668d80917b144c",
//     host: "ec2-54-205-183-19.compute-1.amazonaws.com",
//     port: "5432",
//     database: "df6bo9slgkfcfq"
// });
const pool = new Pool({
    connectionString: "postgres://uuyhzdltyysaxr:74422a6d807e0e655c996a50cc167341c3c947e22e61d6aa3f668d80917b144c@ec2-54-205-183-19.compute-1.amazonaws.com:5432/df6bo9slgkfcfq",
    ssl: {
      rejectUnauthorized: false
    }
  });

pool.connect();

module.exports=pool;