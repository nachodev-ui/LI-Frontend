import { useContext } from "react";
import { StoreContext } from "@/utils/Store";

export const useStore = () => {
  const context = useContext(StoreContext);

  if (context === undefined) {
    throw new Error("useCart must be used within a StoreProvider");
  }

  return context;
};
