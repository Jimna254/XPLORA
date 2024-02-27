CREATE TABLE Bookings (
    booking_id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    tour_id VARCHAR(255) NOT NULL,
    booking_date DATE NOT NULL,
    status VARCHAR(255) NOT NULL,
    isreviewsopen BIT NOT NULL DEFAULT 0, 
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (tour_id) REFERENCES Tours(tour_id)
);

ALTER TABLE Bookings
ADD iscancelled BIT DEFAULT 0;
ALTER TABLE Bookings
DROP COLUMN status;

ALTER TABLE Bookings
ADD isdeleted BIT DEFAULT 0;

ALTER TABLE Bookings
ADD CONSTRAINT DF_Bookings_created_at DEFAULT (GETDATE()) FOR booking_date;

SELECT * FROM Bookings