export interface users {
  user_id: string;
  name: string;
  email: string;
  phone_number: string;
  role: string;
  Password: string;
  
}

export interface updateUser {
  name: string;
  email: string;
  phone_number: string;
  
}

export interface User {
  user_no: number;
  name: string;
  email: string;
  phone_number: string;
  role: string;
  password: string;
  created_at: string;
  // profile_image: string;
}
