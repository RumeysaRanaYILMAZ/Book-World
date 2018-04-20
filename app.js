// load our app server using express somehow....
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

app.use(morgan('combined'))

app.get('/user/:id', (req, res) => {
  console.log("Fetching user with id: " + req.params.id)

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'lbta_mysql'
  })

  const userId = req.params.id
  const queryString = "SELECT * FROM users WHERE id = ?"
  connection.query(queryString, [userId], (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for users: " + err)
      res.sendStatus(500)
      return
      // throw err
    }

    console.log("I think we fetched users successfully")

    const users = rows.map((row) => {
      return {firstName: row.first_name, lastName: row.last_name}
    })

    res.json(users)
  })
})

app.get("/users", (req, res) => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'lbta_mysql'
  })
  const queryString = "SELECT * FROM users"
  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for users: " + err)
      res.sendStatus(500)
      return
    }
    res.json(rows)
  })
})

app.get("/", (req, res) => {
  console.log("Responding to root route")
  res.send("Hello from ROOOOOT")
})

// localhost:3003
app.listen(3003, () => {
  console.log("Server is up and listening on 3003...")
})
