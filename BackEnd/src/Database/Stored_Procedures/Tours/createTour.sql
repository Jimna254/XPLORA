CREATE OR ALTER PROCEDURE createTour(
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
    INSERT INTO Tours(tour_id, title, image, description, location, start_date, end_date, price, category_id) 
    VALUES(@tour_id, @title, @image, @description, @location, @start_date, @end_date, @price, @category_id)
  END