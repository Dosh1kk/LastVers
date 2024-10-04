import axios from "axios";
import { PortfolioGet, PortfolioPost } from  "../Models/Portfolio.tsx";
const api = "http://localhost:5286/api/portfolio/";

export const portfolioAddAPI = async (symbol: string) => {
  try {
    const data = await axios.post<PortfolioPost>(api + `?symbol=${symbol}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const portfolioDeleteAPI = async (symbol: string) => {
  try {
    const data = await axios.delete<PortfolioPost>(api + `?symbol=${symbol}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const portfolioGetAPI = async () => {
  try {
    const data = await axios.get<PortfolioGet[]>(api);
    console.log(data)
    return data;
  } catch (error) {
    console.log(error);
    
  }
};