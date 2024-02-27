CREATE OR ALTER PROCEDURE CheckTourBooking(
    @tour_id VARCHAR(100),
    @user_id VARCHAR(100))
AS
BEGIN

    SELECT * FROM Bookings WHERE tour_id = @tour_id AND user_id = @user_id;
END;

EXEC CheckTourBooking @tour_id = '9e54c132-6b98-4b56-b146-7504a1a4dc5b', @user_id = '0076eae1-57a2-4704-a660-43ca584195d3';

