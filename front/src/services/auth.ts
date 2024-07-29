import api from './api';
import { LoginData, RegisterData, User } from '../types';

export const login = async (data: LoginData) => {
  const response = await api.post<{ user: User; access_token: string }>('/login', data);
  return response.data;
};

export const register = async (data: RegisterData) => {
  const response = await api.post<{ user: User; access_token: string }>('/register/user', data);
  return response.data;
};

export const logout = async () => {
  await api.post('/logout');
};
