import axios from "axios";

const CURRENCY_API = "http://localhost:8000/api/currencies";

export interface Currency {
  id?: number;
  currency_abbreviation: string;
  currency_symbol: string;
  currency_name: string;
  hundredths_name?: string | null;
  country: string;
  auto_exchange_rate_update: boolean;
}

export const getCurrencies = async (): Promise<Currency[]> => {
  const res = await axios.get(CURRENCY_API);
  return res.data;
};

export const getCurrency = async (id: number): Promise<Currency> => {
  const res = await axios.get(`${CURRENCY_API}/${id}`);
  return res.data;
};

export const createCurrency = async (currency: Currency): Promise<Currency> => {
  const res = await axios.post(CURRENCY_API, currency);
  return res.data;
};

export const updateCurrency = async (id: number, currency: Currency): Promise<Currency> => {
  const res = await axios.put(`${CURRENCY_API}/${id}`, currency);
  return res.data;
};

export const deleteCurrency = async (id: number): Promise<void> => {
  await axios.delete(`${CURRENCY_API}/${id}`);
};