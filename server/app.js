const express = require('express')
  require('dotenv').config()


const app = express()
const port = 3000
const router = require('./routes')
const cors = require('cors')
const errHandler = require('./middleware/errorHandler')

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cors())

app.use(router)
app.use(errHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port|| 3000}`)
})


// module.exports = app