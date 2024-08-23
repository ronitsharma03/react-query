import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     staleTime: 1000*15
  //   }
  // }
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
