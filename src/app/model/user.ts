export interface User {
  id: number;
  name: string;
  password: string
  role: string;
}

export interface UserResponse {
  map(arg0: (items: any) => any): any;
  value: User[];
}
