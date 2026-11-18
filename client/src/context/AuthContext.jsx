import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const read = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(read);

  const saveUser = (u) => {
    localStorage.setItem("user", JSON.stringify(u));
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, saveUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
