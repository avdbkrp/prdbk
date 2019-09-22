const sqlite3 = require('sqlite3').verbose()
const bodyParser = require('body-parser')
const { queryDB } = require('./dbController')

let urlencodedParser = bodyParser.urlencoded({ extended: false })

let dbName = 'pr'
let prSql = `SELECT p.id_pr,
        p.pr_name,
        p.pr_sector,
        p.pr_date,
        SUM(a.action_original_value) "pr_value",
        SUM(a.action_original_value) - p.pr_value "pr_diff"
  FROM tb_pr p
  LEFT JOIN tb_action a
  ON p.id_pr = a.fk_pr
  GROUP BY p.id_pr, p.pr_name, p.pr_sector, p.pr_date`
let actionSql = `SELECT a.id_action,
        a.fk_pr,
        a.action_name,
        p.pr_sector,
        p.pr_date,
        a.action_original_value,
        a.action_ressarciment_date,
        a.action_ressarciment_value
  FROM tb_pr p
  INNER JOIN tb_action a
  ON p.id_pr = a.fk_pr`

module.exports = (app) => {

  app.get('/', (req, res) => {
    let pr = queryDB(dbName, prSql)
    pr.then((pr) => {
      res.render('index', { pr: pr, action: action })

    })
  })

  app.get('/create', (req, res) => {
    res.render('create')
  })

  app.post('/create', urlencodedParser, (req, res) => {
    const { pr_description, pr_sector, pr_date, action_name, action_original_value } = req.body

    let prSql = `INSERT INTO tb_pr(pr_name, pr_sector, pr_date)
          VALUES (?, ?, ?)`

    let actionSql = `INSERT INTO tb_action(action_name, action_original_value, fk_pr)
          VALUES (?, ?, ?)`

    let lastIdSql = `SELECT id_pr FROM tb_pr ORDER BY id_pr DESC LIMIT 1`

    db.run(prSql, [pr_description, pr_sector, pr_date], (err) => {
      if (err) {
        return console.log(err.message);
      }

      db.get(lastIdSql, [], (err, row) => {
        if (err) {
          return console.error(err.message);
        }

        if (Array.isArray(action_name)) {
          for (let i = 0; i < action_name.length; i++) {
            db.run(actionSql, [action_name[i], action_original_value[i], row.id_pr], (err) => {
              if (err) {
                return console.log(err.message);
              }
            })
          }
        } else {
          db.run(actionSql, [action_name, pr_date, row.id_pr], (err) => {
            if (err) {
              return console.log(err.message);
            }
          })
        }
        
      })
    })

    res.redirect('/')
  })

}
