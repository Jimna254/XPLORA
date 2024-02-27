export interface userResponse {
  users: [
    {
      user_id: string;
      name: string;
      email: string;
      phone_number: string;
      created_at: string;
    }
  ];
  error: {
    name: string;
    message: string;
  };
  messageerror: string;
}
