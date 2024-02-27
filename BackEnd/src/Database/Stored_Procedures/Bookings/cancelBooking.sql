CREATE OR ALTER PROCEDURE cancelBooking(@booking_id VARCHAR(100))
AS
BEGIN
    UPDATE Bookings SET iscancelled = 1 WHERE booking_id  = @booking_id
END