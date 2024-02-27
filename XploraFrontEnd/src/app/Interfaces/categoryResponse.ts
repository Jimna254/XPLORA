export interface categoriesResponse {
  Categories: [
    {
      category_id: string;
      name: string;
      description: string;
    }
  ];
  error: {
    name: string;
    message: string;
  };
}
