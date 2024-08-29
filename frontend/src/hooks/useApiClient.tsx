import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { Options, Quiz } from "../Types/Quize";
import { useState } from "react";

function useApiClient() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiClient = axios.create({
    baseURL: BASE_URL, // Set your baseURL here
  });

  // Add a request interceptor to automatically include the token in headers
  apiClient.interceptors.request.use(
    (config) => {
      const token = String(localStorage.getItem("quiz_builder"));
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Centralized error handling
  function handleError(error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      setError(error.message);
    } else {
      console.error("An unexpected error occurred");
      setError("An unexpected error occurred");
    }
  }

  // Validation function for creating a quiz
  function validateQuiz(data: Quiz): boolean {
    if (!data.quizName || !data.questions || data.questions.length === 0) {
      setError("Quiz title and questions are required.");
      return false;
    }
    return true;
  }

  async function createQuiz(data: Quiz) {
    if (!validateQuiz(data)) return false;

    setLoading((_) => true);
    setError(null);

    try {
      const res = await apiClient.post("/api/quiz", data);
      if (res.status === 201) {
        return res.data;
      }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading((_) => false);
    }

    return false;
  }

  async function getMyStats() {
    setLoading((_) => true);
    setError((_) => null);

    try {
      const res = await apiClient.get("/api/user/getstats");
      if (res.status === 200) {
        return res.data.data;
      }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading((_) => false);
    }

    return false;
  }

  async function getMyQuizzes() {
    setLoading((_) => true);
    setError((_) => null);

    try {
      const res = await apiClient.get("/api/user/getmyquizzes");
      if (res.status === 200) {
        return res.data.quizzes;
      }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading((_) => false);
    }

    throw new Error("Failed to retrieve quizzes");
  }

  async function getQuizDetail(id: string) {
    setLoading((_) => true);
    setError(_=>null);

    try {
      const res = await apiClient.get(`/api/quiz/${id}`);
      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error("Server error while retrieving quiz details");
      }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading((_) => false);
    }
  }

  async function deleteQuiz(id: string) {
    setLoading((_) => true);
    setError((_) => null);

    try {
      const res = await apiClient.delete(`/api/quiz/${id}`);
      if (res.status === 200) {
        return true;
      } else {
        throw new Error("Server error while deleting the quiz");
      }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading((_) => false);
    }

    return false;
  }

  type getQuestionFnType = {
    questions: Options[];
    typeOfQuiz: "QA" | "POLL";
  };

  async function getQuestion(id: string): Promise<getQuestionFnType | void> {
    setLoading((_) => true);
    setError((_) => null);

    try {
      const res = await apiClient.get(`/api/quiz/questions/${id}`);
      if (res.status === 200) {
        return {
          questions: res.data.questions,
          typeOfQuiz: res.data.typeOfQuiz,
        };
      } else {
        throw new Error("Server error while retrieving questions");
      }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading((_) => false);
    }
  }

  async function updateQuestions(data: any, id: string) {
    if (!data || data.length === 0) {
      setError("Questions data is required.");
      return false;
    }

    setLoading((_) => true);
    setError(_=>null);

    try {
      const res = await apiClient.put(`/api/quiz/questions/${id}`, {
        questions: data,
      });
      if (res.status === 200) {
        return res.data.questions;
      } else {
        throw new Error("Server error while updating questions");
      }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading((_) => false);
    }
  }

  async function getTrendingQuiz() {
    setLoading((_) => true);
    setError((_) => null);

    try {
      const res = await apiClient.get("/api/user/getTrendingQuiz");
      if (res.status === 200) {
        return res.data.quizzes;
      } else {
        throw new Error("Server error while retrieving trending quizzes");
      }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading((_) => false);
    }
  }

  return {
    loading,
    error,
    getTrendingQuiz,
    getQuestion,
    createQuiz,
    apiClient,
    getMyStats,
    getMyQuizzes,
    getQuizDetail,
    deleteQuiz,
    updateQuestions,
  };
}

export default useApiClient;
