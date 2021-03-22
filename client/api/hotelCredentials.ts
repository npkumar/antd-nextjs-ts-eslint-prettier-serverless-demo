import { HOTEL_CREDENTIAL } from './../types/credentials';
import axios from 'axios';
import useSWR from 'swr';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const endpoint = '/api/hotelcredentials';
const axiosInstance = axios.create({ baseURL: endpoint });

const defaultPageSize = 6;

export const useCredentials = ({ page = 1, pageSize = defaultPageSize, hotelName = null }) => {
  let searchUrl = `${endpoint}?page=${page - 1}&size=${pageSize}`;
  if (hotelName) {
    searchUrl += `&hotelName=${hotelName}`;
  }

  const { data, error } = useSWR<{
    content: HOTEL_CREDENTIAL[];
    totalPages: number;
  }>(searchUrl, fetcher);

  const isLoading = !error && !data;
  const isError = !!error;

  const credentials = data?.content;
  const totalPages = data?.totalPages;

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
  const { data } = await axiosInstance.post<HOTEL_CREDENTIAL>('/', { ...values });
  return data;
};

export const deleteCredential = async (id: string) => {
  const { data } = await axiosInstance.delete<HOTEL_CREDENTIAL>(`/${id}`);
  return data;
};

export const updateCredential = async (id: string, values: HOTEL_CREDENTIAL) => {
  const { data } = await axiosInstance.put<HOTEL_CREDENTIAL>(`/${id}`, { ...values });
  return data;
};
