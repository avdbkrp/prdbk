const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./db/pr.db"
  }
})

module.exports.queryPR = async () => {
  return await knex.from('tb_pr as p')
    .select(
      'p.id_pr',
      'p.pr_name',
      'p.pr_sector',
      'p.pr_date',
      knex.raw('sum(??) - ?? as ??', ['a.action_original_value', 'p.pr_value', 'pr_diff'])
    ).sum('a.action_original_value as pr_value')
    .leftJoin('tb_action as a', { 'p.id_pr': 'a.fk_pr'})
    .groupBy('p.id_pr', 'p.pr_name', 'p.pr_sector', 'p.pr_date')
}

module.exports.queryAction = async () => {
  return await knex.from('tb_pr as p')
    .select(
      'a.id_action',
      'a.fk_pr',
      'a.action_name',
      'p.pr_sector',
      'p.pr_date',
      'a.action_original_value',
      'a.action_ressarciment_date',
      'a.action_ressarciment_value'
    ).join('tb_action as a', {'p.id_pr': 'a.fk_pr'})
}