export interface bookingDetails {
  tour_id: string;
  user_id: string;
}

export interface bookingResponse {
  Bookings: [
    {
      booking_id: string;
      tour_name: string;
      user_name: string;
      booking_date: string;
      iscancelled: string;
      isreviewsopen: string;
    }
  ];
  error: {
    name: string;
    message: string;
  };
}

export interface userbookingResponse {
  bookings: [
    {
      booking_id: string;
      tour_title: string;
      user_name: string;
      booking_date: string;
      iscancelled: string;
      isreviewsopen: string;
    }
  ];
  error: {
    name: string;
    message: string;
  };
}
