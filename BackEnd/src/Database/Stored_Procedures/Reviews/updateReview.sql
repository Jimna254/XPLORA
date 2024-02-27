CREATE OR ALTER PROCEDURE updatereview(
    @review_id VARCHAR(250),
    @booking_id VARCHAR(250),
    @rating VARCHAR(250),
    @comment VARCHAR(250),
    @user_id VARCHAR(250)
    

  ) 
  AS
  BEGIN
    UPDATE Reviews SET 
    booking_id = @booking_id,
    rating = @rating,
    comment = @comment,
    user_id = @user_id

    WHERE review_id=@review_id;
  END