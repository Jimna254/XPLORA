CREATE OR ALTER PROCEDURE deleteTour(@tour_id VARCHAR(100))
AS
BEGIN
    UPDATE Tours SET isdeleted = 1 WHERE tour_id  = @tour_id
END