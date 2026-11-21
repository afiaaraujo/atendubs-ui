import { api } from './api.js';

export const patientService = {
  async getWaitingQueue() {
    const response = await api.get('/pacientes');
    return response.data;
  },

  async createPatient(patientData) {
    const response = await api.post('/pacientes', patientData);
    return response.data;
  },

  async callPatient(id, consultorio) {
    const response = await api.put(`/pacientes/${id}/chamar`, { consultorio });
    return response.data;
  },

  async finishPatient(id) {
    const response = await api.put(`/pacientes/${id}/finalizar`);
    return response.data;
  },

  async getReports() {
    const response = await api.get('/relatorios');
    return response.data;
  },
};
