import type { ResultLab } from "@/types/lab";
import type { Form } from "@/types/user";


export const loginApi = async (loginForm: Form): Promise<{ access_token: string }> => {
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
  

export  const fetchUser = async (token: string) => {
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
  
  
  export  const getAllResults = async () : Promise<ResultLab[]> => {
      const access_token = localStorage.getItem("access_token")
    
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }
    
      if (access_token) {
        headers["access_token"] = access_token
      }
    
      const response = await fetch("http://localhost:3000/lab-results", {
        method: "GET",
        headers,
      })
      console.log(response);
      
    
      return response.json()
    }