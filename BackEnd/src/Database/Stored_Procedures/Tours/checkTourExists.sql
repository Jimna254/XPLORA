CREATE OR ALTER PROCEDURE CheckTourExists
    @title VARCHAR(255)
AS
BEGIN   
    SELECT * FROM Tours WHERE title = @title;   
END;