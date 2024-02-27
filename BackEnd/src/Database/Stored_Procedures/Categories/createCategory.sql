CREATE OR ALTER PROCEDURE createCategory(
    @category_id VARCHAR(250),
    @name VARCHAR(250),
    @description VARCHAR(1000)

   
  ) 
  AS
  BEGIN
    INSERT INTO Categories(category_id, name, description)
    VALUES(@category_id, @name, @description)
  END