import React from "react";

export const SearchContext = React.createContext<{
  data: { id: number; name: string }[];
  setData: React.Dispatch<React.SetStateAction<{ id: number; name: string }[]>>;
}>({
  data: [],
  setData: () => {},
});