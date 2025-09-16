import axios from "axios";

const API_URL = "http://localhost:8000/api/sales-types"; // Laravel API endpoint

export interface SalesType {
  id?: number;
  typeName: string;
  factor: number;
  taxIncl: boolean;
  status?: string;
}

export const getSalesTypes = async (): Promise<SalesType[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getSalesType = async (id: number): Promise<SalesType> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createSalesType = async (salesType: SalesType): Promise<SalesType> => {
  const response = await axios.post(API_URL, salesType);
  return response.data;
};

export const updateSalesType = async (id: number, salesType: SalesType): Promise<SalesType> => {
  const response = await axios.put(`${API_URL}/${id}`, salesType);
  return response.data;
};

export const deleteSalesType = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
