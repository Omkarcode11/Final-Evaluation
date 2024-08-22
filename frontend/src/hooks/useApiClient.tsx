import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { Options, Quiz } from "../Types/Quize";
type Props = {};

function useApiClient() {
  const apiClient = axios.create({
    baseURL: BASE_URL, // Set your baseURL here
  });

  // Add a request interceptor to automatically include the token in headers
  apiClient.interceptors.request.use(
    (config) => {
      // Get the token from localStorage
      const token = String(localStorage.getItem("quiz_builder"));

      // If a token exists, add it to the Authorization header
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      // Handle the error
      return Promise.reject(error);
    }
  );

  async function createQuiz(data: Quiz) {
    try {
      let res = await apiClient.post("/api/quiz", data);
     
      if (res.status == 201) {
        return true;
      }
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
      else console.log(err);
      return false;
    }
  }

  async function getMyStats(){
    try {
      let res = await apiClient.get("/api/user/getstats");
     
      if (res.status == 200) {
        return res.data.data;
      }
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
      else console.log(err);
      return false;
    }
  }

  async function getMyQuizzes(){
     let data = await apiClient.get('/api/user/getmyquizzes')
     if(data.status==200){
        return data.data.quizzes
     }
     throw new Error("Not get my Quizzes")
  }

  async function getQuizDetail(id:string){
    try{
      let res = await apiClient.get(`/api/quiz/${id}`)
      if(res.status==200){
        return res.data
      }else{
        throw new Error("server error while getting the quizDetail")
      }

    }catch(err){
      if(err instanceof Error)
      console.log(err.message)
      else console.log(err)
    }
  }

  async function deleteQuiz(id:string){
    try{
      let res = await apiClient.delete(`/api/quiz/${id}`)
      if(res.status==200){
        return true
      }else{
        throw new Error("server error while getting the quizDetail")
      }
    }catch(err){
      if(err instanceof Error)
      console.log(err.message)
      else console.log(err)
    }
    
  }

  return {
    createQuiz,
    apiClient,
    getMyStats,
    getMyQuizzes,
    getQuizDetail,
    deleteQuiz,
  };
}

export default useApiClient;
