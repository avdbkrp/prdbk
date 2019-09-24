const bodyParser = require('body-parser')
const { queryPR, queryAction, createPR } = require('./queries')

let urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = (app) => {

  app.get('/', (req, res) => {
    queryPR().then((pr) => {
      queryAction().then((action) => {
        res.render('index', { pr: pr, action: action })
      })
    })
  })

  app.get('/create', (req, res) => {
    res.render('create')
  })

  app.post('/create', urlencodedParser, (req, res) => {
    createPR(req.body, () => res.redirect('/'))
  })

}
