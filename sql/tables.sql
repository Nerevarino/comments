CREATE TABLE IF NOT EXISTS Messages (
       id SERIAL PRIMARY KEY,
       nickname varchar(30) NOT NULL,
       time     varchar(30) NOT NULL,
       comment  varchar(200) NOT NULL
);

SELECT * FROM Messages;
