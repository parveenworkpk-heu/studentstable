export interface Student {
  id: string;
  name: string;
  email: string;
  age: number;
}

export interface StudentFormData {
  name: string;
  email: string;
  age: string;
}

export interface ValidationErrors {
  name?: string;
  email?: string;
  age?: string;
}
