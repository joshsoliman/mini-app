const API_URL = 'http://localhost:3001/companies';

export const getCompanies = () =>
  fetch(API_URL).then(res => res.json());

export const createCompany = (data: any) =>
  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const updateCompany = (id: number, data: any) =>
  fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const deleteCompany = (id: number) =>
  fetch(`${API_URL}/${id}`, { method: 'DELETE' });