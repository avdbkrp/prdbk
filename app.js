const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.render('./index.ejs')
})

app.listen(port)
console.log('You are listening on the port ' + port);
