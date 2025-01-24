const fs = require("fs")
require("dotenv").config()

const db = require("./connect")

const countriesSQL = fs.readFileSync("./server/db/countries.sql").toString()
const leadersSQL = fs.readFileSync("./server/db/leaders.sql").toString()

const seedDB = async () => {
    try {
        await db.query(leadersSQL)
        await db.query(countriesSQL)
        db.end()
        console.log("Database seeded")
    } catch(err) {
        console.log(err)
    }
}

seedDB()

// db.query(countriesSQL)
//   .then((data) => {
//     db.end()
//     console.log("Countries data seeded")
//   })
//   .catch((error) => console.log(error))

// db.query(leadersSQL)
//   .then((data) => {
//     db.end()
//     console.log("Leaders data seeded")
//   })
//   .catch((error) => console.log(error))
