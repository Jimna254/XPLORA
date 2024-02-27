CREATE OR ALTER PROCEDURE CheckCategoryExists
    @name VARCHAR(255)
AS
BEGIN
    
    SELECT * FROM Categories WHERE name = @name;

    
END;