const express = require('express')
const app = express()
const port = 3000

const jsController = require('./controllers/prController')

app.set('view engine', 'ejs')
app.use(express.static('./public'))

app.listen(port)
console.log('You are listening on the port ' + port)

jsController(app)
