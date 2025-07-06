export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  password: string;
  userPicture: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  uniqueId?: string;
  role?: string;
}

export interface UserResponse {
  id: string;
  type: string;
  attributes: User;
  token: string;
}
