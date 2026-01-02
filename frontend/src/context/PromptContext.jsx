import { createContext, useState } from "react";
import api from "../services/api";

export const PromptContext = createContext();

export const PromptProvider = ({ children }) => {
  const [prompts, setPrompts] = useState([]);
  const [myPrompts, setMyPrompts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get all public prompts
  const getAllPrompts = async ({ search = "", page = 1, limit = 6 } = {}) => {
  setLoading(true);

  const res = await api.get("/prompts", {
    params: { search, page, limit }
  });

  setPrompts(res.data.data);
  setLoading(false);
};


  // Get my prompts
  const getMyPrompts = async () => {
    setLoading(true);
    const res = await api.get("/prompts/my-prompts");
    setMyPrompts(res.data);
    setLoading(false);
  };

  // Get prompt by ID
  const getPromptById = async (id) => {
    const res = await api.get(`/prompts/${id}`);
    console.log("prompt by id ",res.data);
    return res.data;
  };

  // Create prompt
  const createPrompt = async (data) => {
    const res = await api.post("/prompts/", data);
    setMyPrompts((prev) => [res.data, ...prev]);
    return res.data;
  };

  // Update prompt
  const updatePrompt = async (id, data) => {
    const res = await api.patch(`/prompts/${id}`, data);
    setMyPrompts((prev) =>
      prev.map((p) => (p._id === id ? res.data : p))
    );
    return res.data;
  };

  // Delete prompt
  const deletePrompt = async (id) => {
    await api.delete(`/prompts/${id}`);
    setMyPrompts((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <PromptContext.Provider
      value={{
        prompts,
        myPrompts,
        loading,
        getAllPrompts,
        getMyPrompts,
        getPromptById,
        createPrompt,
        updatePrompt,
        deletePrompt,
      }}
    >
      {children}
    </PromptContext.Provider>
  );
};
