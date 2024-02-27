USE XPLORA
CREATE OR ALTER PROCEDURE updateBooking(
    @booking_id VARCHAR(250),
    @user_id VARCHAR(250),
    @tour_id VARCHAR(250)

   
  ) 
  AS
  BEGIN
    UPDATE Bookings SET 
    tour_id = @tour_id,
    user_id = @user_id
   
    WHERE booking_id = @booking_id;
  END