import { HOTEL_CREDENTIAL } from './../types/credentials';
import axios from 'axios';
import useSWR from 'swr';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const endpoint = '/api/hotelcredentials';

// TODO: Implement this
export const useCredentials = () => {
  const { data, error } = useSWR<HOTEL_CREDENTIAL[]>(endpoint, fetcher);

  const credentials = data;
  const isLoading = !error && !data;
  const isError = !!error;

  return {
    credentials,
    isLoading,
    isError,
  };
};

export const useCredential = (id: string) => {
  const { data, error } = useSWR<HOTEL_CREDENTIAL>(`${endpoint}/${id}`, fetcher);

  const credential = data;
  const isLoading = !error && !data;
  const isError = !!error;

  return {
    credential,
    isLoading,
    isError,
  };
};

export const createCredential = async (values: HOTEL_CREDENTIAL) => {
  const result = await axios.post<HOTEL_CREDENTIAL>(endpoint, { ...values });
  return result;
};

export const deleteCredential = async (id: string) => {
  const result = await axios.delete<HOTEL_CREDENTIAL>(`${endpoint}/${id}`);
  return result;
};

export const updateCredential = async (id: string, values: HOTEL_CREDENTIAL) => {
  const result = await axios.put<HOTEL_CREDENTIAL>(`${endpoint}/${id}`, { ...values });
  return result;
};
