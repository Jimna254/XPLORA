CREATE TABLE Tours (
    tour_id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
	image VARCHAR(255) NOT NULL,
    description VARCHAR(MAX) NOT NULL, 
    location VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    price VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL,
    category_id VARCHAR(255) ,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

ALTER TABLE Tours
ALTER COLUMN start_date VARCHAR(50) NOT NULL;

ALTER TABLE Tours
ALTER COLUMN end_date VARCHAR(50) NOT NULL;

ALTER TABLE Tours
ADD CONSTRAINT DF_Tours_created_at DEFAULT (GETDATE()) FOR created_at;

ALTER TABLE Tours
ADD isdeleted BIT DEFAULT 0;

SELECT * FROM Tours 