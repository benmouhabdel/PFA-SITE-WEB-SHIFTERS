export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  phone?: string; 
  registration_key?: string;
   // Ajoutez cette ligne
}

  
  export interface LoginData {
    email: string;
    password: string;
  }
  
  export interface RegisterData extends LoginData {
    name: string;
  }
  // src/types/index.ts

  export interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    user: User; // Add this line
  }
