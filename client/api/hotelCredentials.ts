import { HOTEL_CREDENTIAL } from './../types/credentials';
import axios from 'axios';
import useSWR from 'swr';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const endpoint = '/api/hotelcredentials';

const defaultPageSize = 6;

export const useCredentials = ({ page = 1, pageSize = defaultPageSize, hotelName = null }) => {
  let searchUrl = `${endpoint}?page=${page - 1}&size=${pageSize}`;
  if (hotelName) {
    searchUrl += `&hotelName=${hotelName}`;
  }

  const { data, error } = useSWR(searchUrl, fetcher);

  const isLoading = !error && !data;
  const isError = !!error;

  const credentials: HOTEL_CREDENTIAL[] = data?.content;
  const totalPages: number = data?.totalPages;

  return {
    isLoading,
    isError,
    credentials,
    totalPages,
    pageSize,
    data,
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
  const { data } = await axios.post<HOTEL_CREDENTIAL>(endpoint, { ...values });
  return data;
};

export const deleteCredential = async (id: string) => {
  const { data } = await axios.delete<HOTEL_CREDENTIAL>(`${endpoint}/${id}`);
  return data;
};

export const updateCredential = async (id: string, values: HOTEL_CREDENTIAL) => {
  const { data } = await axios.put<HOTEL_CREDENTIAL>(`${endpoint}/${id}`, { ...values });
  return data;
};
