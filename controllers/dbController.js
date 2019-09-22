const sqlite3 = require('sqlite3').verbose()

const queryDB = (dbName, sql, params = null) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(`./db/${dbName}.db`)
    const queries = []
    console.log(db)
    db.each(sql, [params], (err, row) => {
      if (err) {
        console.error(err)
        reject(err)
      } else {
        queries.push(row)
    }
  }, (err, n) => {
      if (err) {
        console.error(err)
        reject(err)
      } else {
        resolve(queries)
      }
    })
  })
}

/*
let sql = `CREATE TABLE IF NOT EXISTS tb_pr (
  id_pr INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  pr_name TEXT NOT NULL,
  pr_sector TEXT NOT NULL,
  pr_date INTEGER NOT NULL,
  pr_value REAL
);`

db.run(sql, (res, err) => {
  if (err) {
    return console.log(err.message);
  }
})

sql = `INSERT INTO tb_promo(promo_name, promo_ressarciment_date, promo_ressarciment_value, fk_pr)
          VALUES (?, ?, ?, ?)`

db.run(sql, ['Ação 22', 125166669, 874.51, 2], (err) => {
  if (err) {
    return console.log(err.message);
  }
  // get the last insert id
  console.log(`A row has been inserted with rowid ${this.id_pr}`);
})

let pr = []
let promo = []

sql = `SELECT tb_pr.id_pr,
       tb_pr.pr_name,
       tb_pr.pr_sector,
       tb_pr.pr_date,
       SUM(tb_promo.promo_ressarciment_value) "pr_value",
       SUM(tb_promo.promo_ressarciment_value) - tb_pr.pr_value "pr_diff"
FROM tb_pr
LEFT JOIN tb_promo
ON tb_pr.id_pr = tb_promo.fk_pr
GROUP BY tb_pr.id_pr, tb_pr.pr_name, tb_pr.pr_sector, tb_pr.pr_date`

db.each(sql, [], (err, row) => {
  if (err) {
    return console.error(err.message);
  }
  return pr.push(row)
})

sql = `SELECT tb_promo.id_promo,
       tb_promo.fk_pr,
       tb_promo.promo_name,
       tb_pr.pr_sector,
       tb_pr.pr_date,
       tb_promo.promo_ressarciment_date,
       tb_promo.promo_ressarciment_value
FROM tb_pr
INNER JOIN tb_promo
ON tb_pr.id_pr = tb_promo.fk_pr`

db.close() */

module.exports = { queryDB }