import axios from "axios";
import { CommentGet, CommentPost } from "../Models/Comment";
const api = "http://localhost:5286/api/comment/";
export const commentPostAPI = async (
  title: string,
  content: string,
  symbol: string
) => {
  try {
    const data = await axios.post<CommentPost>(api + `${symbol}`, {
      title: title,
      content: content,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const commentGetAPI = async (symbol: string) => {
    try {
      const data = await axios.get<CommentGet[]>(api + `?Symbol=${symbol}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  };