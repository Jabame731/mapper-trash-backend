export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  password: string;
  userPicture: string | null;
  createdAt: Date;
  updatedAt?: Date;
}

export interface UserResponse {
  id: string;
  type: string;
  role: string;
  attributes: User;
}
