import { create } from "zustand";
import Cookies from "js-cookie";
import axios from "axios";

interface UserState {
  user: any | null;
  token: string | null;
  setUser: (user: any) => void;
  setToken: (token: string) => void;
  clearUser: () => void;
  fetchUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  token: null,
  setUser: (user) => set({ user }),
  setToken: (token) => {
    if (token) {
      Cookies.set("token", token);
      set({ token });
    } else {
      Cookies.remove("token");
      set({ token: null });
    }
  },
  clearUser: () => {
    Cookies.remove("token");
    set({ user: null, token: null });
  },
  fetchUser: async () => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const response = await axios.get("https://dummyjson.com/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        set({ user: response.data });
      } catch (error) {
        console.error("Failed to fetch user data", error);
        set({ user: null });
        Cookies.remove("token");
      }
    }
  },
}));

export default useUserStore;
