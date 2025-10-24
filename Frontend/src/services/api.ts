import axios from 'axios';
import { MarketCalcInput } from '../types';

const API_BASE_URL = 'http://localhost:4000';

export const fetchPrice = async (tokenAddress: string) => {
  const response = await axios.get(`${API_BASE_URL}/price/${tokenAddress}`);
  return response.data;
};

export const fetchPool = async (poolAddress: string) => {
  const response = await axios.get(`${API_BASE_URL}/pool/${poolAddress}`);
  return response.data;
};

export const calculateMarketCaps = async (inputs: MarketCalcInput[]) => {
  const response = await axios.post(`${API_BASE_URL}/calculate`, inputs);
  return response.data;
};