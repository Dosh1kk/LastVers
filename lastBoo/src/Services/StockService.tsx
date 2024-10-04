import axios from "axios";
import { StockGet, StockPost } from "../Models/Stock.tsx";
const api = "http://localhost:5286/api/stock/";

export const stockAddAPI = async (symbol: StockPost) => {
  try {
    const data = await axios.post<StockPost>(api + `?symbol=${symbol.name}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const stockDeleteAPI = async (symbol: string) => {
  try {
    const data = await axios.delete<StockPost>(api + `?symbol=${symbol}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const stockGetAPI = async () => {
  try {
    const data = await axios.get<StockGet[]>(api);
    return data;
  } catch (error) {
    console.log(error);
  }
};