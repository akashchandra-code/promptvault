import { AuthProvider } from "./AuthContext";
import { PromptProvider } from "./PromptContext";

const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <PromptProvider>{children}</PromptProvider>
    </AuthProvider>
  );
};

export default AppProvider;
