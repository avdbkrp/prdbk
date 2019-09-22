CREATE TABLE IF NOT EXISTS tb_pr (
  id_pr INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  pr_name TEXT NOT NULL,
  pr_sector TEXT NOT NULL,
  pr_date INTEGER NOT NULL,
  pr_value REAL
);

INSERT INTO tb_pr(pr_name, pr_sector, pr_date, pr_value)
VALUES ('Two page', 'Trade', 11155611, 1562.12)

SELECT * FROM tb_pr

CREATE TABLE IF NOT EXISTS tb_action (
  id_action INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  action_name TEXT NOT NULL,
  action_original_value REAL NOT NULL,
  action_ressarciment_date REAL,
  action_ressarciment_value REAL,
  fk_pr INTEGER NOT NULL,
  FOREIGN KEY (fk_pr) REFERENCES tb_pr (id_pr)
);

INSERT INTO tb_action(action_name, action_ressarciment_date, action_ressarciment_value, fk_pr)
VALUES ('Ação 22', 125166669, 874.51, 2)

SELECT * FROM tb_action

SELECT p.id_pr,
       p.pr_name,
       p.pr_sector,
       p.pr_date,
       SUM(a.action_original_value) "pr_value",
       SUM(a.action_original_value) - p.pr_value "pr_diff"
FROM tb_pr p
LEFT JOIN tb_action a
ON p.id_pr = a.fk_pr
GROUP BY p.id_pr, p.pr_name, p.pr_sector, p.pr_date


SELECT a.id_action,
       a.fk_pr,
       a.action_name,
       p.pr_sector,
       p.pr_date,
       a.action_original_value,
       a.action_ressarciment_date,
       a.action_ressarciment_value
FROM tb_pr p
INNER JOIN tb_action a
ON p.id_pr = a.fk_pr