CREATE OR ALTER PROCEDURE createReview(
   
    @review_id VARCHAR(250),
    @booking_id VARCHAR(250),
    @rating VARCHAR(250),
    @comment VARCHAR(500),
    @user_id VARCHAR (250)
  ) 
  AS
  BEGIN
    INSERT INTO Reviews(review_id, booking_id, rating, comment, user_id)
    VALUES(@review_id, @booking_id, @rating, @comment, @user_id);
  END