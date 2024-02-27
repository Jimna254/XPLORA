CREATE TABLE Reviews (
    review_id VARCHAR(255) PRIMARY KEY,
    booking_id VARCHAR(255) NOT NULL,
    rating VARCHAR(255) NOT NULL, 
    comment VARCHAR(MAX), 
    created_at DATE NOT NULL
    FOREIGN KEY (booking_id) REFERENCES Bookings(booking_id)
);


ALTER TABLE Reviews
ADD user_id VARCHAR(255);

ALTER TABLE Reviews
ADD CONSTRAINT FK_user_idconstraint FOREIGN KEY (user_id) REFERENCES Users(user_id);

ALTER TABLE Reviews
ADD isdeleted BIT DEFAULT 0;

ALTER TABLE Reviews
ADD CONSTRAINT FK_booking_idconstraint FOREIGN KEY (booking_id) REFERENCES Bookings(booking_id);

ALTER TABLE Reviews
ADD CONSTRAINT DF_Reviews_created_at DEFAULT (GETDATE()) FOR created_at;