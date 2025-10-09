import { createContext, useContext } from "react";

export const Data = createContext([]);
export const useData = () => useContext(Data);
