CREATE TABLE Categories (
    category_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255)
);

ALTER TABLE Categories
ADD isdeleted BIT DEFAULT 0;

