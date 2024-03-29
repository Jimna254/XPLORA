USE XPLORA

CREATE TABLE Users (
    user_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255)  NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
	role VARCHAR(255) DEFAULT 'user',
    password VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL
);


ALTER TABLE Users
ADD isdeleted BIT DEFAULT 0;
ALTER TABLE Users
ADD CONSTRAINT DF_Users_created_at DEFAULT (GETDATE()) FOR created_at;

ALTER TABLE Users
ADD role VARCHAR(255) NOT NULL;

ALTER TABLE Users
ADD phone_number VARCHAR(255) ;

ALTER TABLE Users
ALTER COLUMN role VARCHAR(255) NOT NULL;

SELECT * FROM Users