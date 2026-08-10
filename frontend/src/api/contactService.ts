import { apiClient } from './apiClient';

export interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const contactService = {
  submitContactForm: async (data: ContactData): Promise<void> => {
    await apiClient.post('/contact', data);
  }
};
