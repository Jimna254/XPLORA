export interface ITour {
  title: string;
  image: string;
  description: string;
  location: string;
  start_date: string;
  price: string;
  end_date: string;
  category_id: string;
}

export interface toursResponse {
  Tours: [
    {
      title: string;
      image: string;
      description: string;
      location: string;
      start_date: string;
      price: string;
      end_date: string;
    }
  ];
  error: {
    name: string;
    message: string;
  };
}
