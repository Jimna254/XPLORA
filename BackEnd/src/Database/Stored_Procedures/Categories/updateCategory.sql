CREATE OR ALTER PROCEDURE updateCategory(
    @category_id VARCHAR(250),
    @name VARCHAR(250),
    @description VARCHAR(1000)

   
  ) 
  AS
  BEGIN
    UPDATE Categories SET 
    name = @name, 
    description = @description   
    WHERE category_id=@category_id;
  END