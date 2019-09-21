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

CREATE TABLE IF NOT EXISTS tb_promo (
  id_promo INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  promo_name TEXT NOT NULL,
  promo_original_value REAL NOT NULL,
  promo_ressarciment_date REAL,
  promo_ressarciment_value REAL,
  fk_pr INTEGER NOT NULL,
  FOREIGN KEY (fk_pr) REFERENCES tb_pr (id_pr)
);

INSERT INTO tb_promo(promo_name, promo_ressarciment_date, promo_ressarciment_value, fk_pr)
VALUES ('Ação 22', 125166669, 874.51, 2)

SELECT * FROM tb_promo

SELECT tb_pr.id_pr,
       tb_pr.pr_name,
       tb_pr.pr_sector,
       tb_pr.pr_date,
       SUM(tb_promo.promo_ressarciment_value) "pr_value",
       SUM(tb_promo.promo_ressarciment_value) - tb_pr.pr_value "pr_diff"
FROM tb_pr
LEFT JOIN tb_promo
ON tb_pr.id_pr = tb_promo.fk_pr


SELECT tb_promo.id_promo,
       tb_promo.fk_pr,
       tb_promo.promo_name,
       tb_pr.pr_sector,
       tb_pr.pr_date,
       tb_promo.promo_original_value,
       tb_promo.promo_ressarciment_date,
       tb_promo.promo_ressarciment_value
FROM tb_pr
INNER JOIN tb_promo
ON tb_pr.id_pr = tb_promo.fk_pr