CREATE OR ALTER PROCEDURE getOneTour(@tour_id VARCHAR(250))
AS
BEGIN
SELECT * FROM Tours
WHERE tour_id = @tour_id;
END;