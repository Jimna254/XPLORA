CREATE OR ALTER PROCEDURE updateTour(
    @tour_id VARCHAR(255),
    @title VARCHAR(255),
    @image VARCHAR(255),
    @description VARCHAR(255),
    @location VARCHAR(255),
    @start_date DATE,
    @end_date DATE,
    @price VARCHAR(255),
    @category_id VARCHAR(255)

  ) 
  AS
  BEGIN
    UPDATE Tours SET
    title = @title,
    image = @image,
    description= @description,
    location= @location,
    start_date = @start_date,
    end_date = @end_date,
    price = @price,
    category_id = @category_id
    WHERE tour_id = @tour_id;
   
  END