import { LoginPayload } from '../models';
import { axiosClient } from './axios-client';

export const authApi = {
  login(data: LoginPayload) {
    return axiosClient.post('/login', data);
  },

  logout() {
    return axiosClient.get('/logout');
  },

  profile() {
    return axiosClient.get('/profile');
  },
};
