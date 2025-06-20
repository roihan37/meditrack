import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";

// 🧑‍💻 Tipe data user dan form
export type User = { 
    id: string,
    username: string,
    email: string,
    phoneNumber: string,
    address: string,
    createdAt: string,
    updatedAt: string 
};
export type Form = {
  email: string;
  password: string;
};

// 🔐 Tipe context
type AuthContextType = {
  login: (loginForm: Form) => Promise<void>;
  logout: () => void;
  user : User | null,
  loading : boolean
};

// 🌱 Buat Context (dengan default undefined agar aman)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 📦 Props untuk Provider
type AuthProviderProps = PropsWithChildren;

// 🔌 Simulasi API login (dengan error handling)
const loginApi = async (loginForm: Form): Promise<{ access_token: string }> => {
  const response = await fetch("http://localhost:3000/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginForm),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(responseJson.message || "Login failed");
  }

  return responseJson;
};

const fetchUser =async (token: string) => {
    const response = await fetch("http://localhost:3000/user/profile", {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        "access_token": token
    },
  });

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(responseJson.message || "Login failed");
  }

  return responseJson;
}

// 🎯 Provider utama
export const AuthProvider = ({ children }: AuthProviderProps) => {
  // State untuk menyimpan user jika dibutuhkan
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const login = async (loginForm: Form) => {
    try {
      const {access_token} = await loginApi(loginForm);
      localStorage.setItem("access_token", access_token); // simpan token
    
    } catch (error) {
      console.error("Login error:", error);
      throw error; // lempar agar bisa ditangani di komponen
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetchUser(token)
      .then(setUser)
      .catch(() => {
        logout(); 
      })
      .finally(() => setLoading(false));
  }, []);

  
  return (
    <AuthContext.Provider value={{ login, logout, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 📥 Hook untuk konsumsi context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext must be used within AuthProvider");
  return context;
};
