import React from "react";

// Context for display search result on the page

export const SearchContext = React.createContext<{
  data: { id: number; name: string }[];
  setData: React.Dispatch<React.SetStateAction<{ id: number; name: string }[]>>;
}>({
  data: [],
  setData: () => {},
});