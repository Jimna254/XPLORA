CREATE OR ALTER PROCEDURE getUserBookings
    @user_id NVARCHAR(255)
AS
BEGIN
    SELECT
        B.booking_id,
        B.user_id,
        B.tour_id,
        B.booking_date,
        B.isreviewsopen,
        B.iscancelled,
        U.name AS user_name, 
        U.email AS user_email,
        T.title AS tour_title,
        T.description AS tour_description, 
	    T.image AS tour_image
    FROM
        Bookings B
    INNER JOIN Users U ON B.user_id = U.user_id
    INNER JOIN Tours T ON B.tour_id = T.tour_id
    WHERE B.user_id = @user_id AND iscancelled = 0;
END;
