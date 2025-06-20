import type { Form, User } from "@/types/user";
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import { fetchUser, getAllResults, loginApi } from "./action";
import type { ResultLab } from "@/types/lab";


type AuthContextType = {
  login: (loginForm: Form) => Promise<void>;
  logout: () => void;
  user : User | null,
  loading : boolean,
  results : ResultLab[] | []
};


export const AuthContext = createContext<AuthContextType | undefined>(undefined);


type AuthProviderProps = PropsWithChildren;


export const AuthProvider = ({ children }: AuthProviderProps) => {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [results, setResults] = useState<ResultLab[]>([]);

  const login = async (loginForm: Form) => {
    try {
      const {access_token} = await loginApi(loginForm);
      localStorage.setItem("access_token", access_token); 
      const user = await fetchUser(access_token);
      const resultLab = await getAllResults()

      setResults(resultLab)
      setUser(user);
    } catch (error) {
      console.error("Login error:", error);
      throw error; 
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("access_token");
  };

  

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setLoading(false);
        return;
      }
  
      try {
        const userData = await fetchUser(token);
        const resultLab = await getAllResults()
        setUser(userData);
        setResults(resultLab)
      } catch (error) {
        logout(); // kalau gagal ambil user, anggap token tidak valid
      } finally {
        setLoading(false); // selesai loading, baik sukses atau gagal
      }
    };
  
    init();
  }, []);

  
  return (
    <AuthContext.Provider value={{ login, logout, user, loading, results }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext must be used within AuthProvider");
  return context;
};
