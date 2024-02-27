CREATE OR ALTER PROCEDURE deleteBooking(@booking_id VARCHAR(100))
AS
BEGIN
    UPDATE Bookings SET isdeleted = 1 WHERE booking_id  = @booking_id
END