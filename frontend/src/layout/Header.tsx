import React, { useRef } from "react";
import {ShoppingCart,Heart,Search,User2Icon,LogIn,LogOut,UserPlus} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useLocation, useNavigate } from "react-router-dom";
import { setSearch } from "../store/slices/searchSlice";
import api from "../Api";
import logo from "../../public/vite.png";

const Header = () => {
  const authSlice = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const intervalRef = useRef<any>(null);
  const loadSearch = location.pathname === "/products";

  function handleSearchChange(term: string) {
    if (intervalRef.current) clearTimeout(intervalRef.current);
    intervalRef.current = setTimeout(() => dispatch(setSearch(term)), 800);
  }

  return (
    <header className="w-full shadow-sm border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="w-full flex flex-wrap items-center justify-between gap-2">
          <button
            onClick={() => navigate("/")}
            className="order-1 flex items-center gap-2 text-red-600 font-semibold text-lg cursor-pointer hover:text-red-700 hover:brightness-50 whitespace-nowrap"
          >
            <img src={logo} alt="Logo" className="w-6 h-6" />
            <span>Hot Deals</span>
          </button>

          {loadSearch && (
            <div
              className={
                "order-3 w-full mt-3 " +
                "sm:order-2 sm:mt-0 sm:w-auto sm:flex-1 sm:max-w-3xl " +
                "flex justify-center transition-all duration-150"
              }
            >
              <div className="w-full min-w-0 sm:min-w-[300px]">
                <div className="flex items-center w-full border rounded-full overflow-hidden">
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full flex-1 min-w-0 px-4 py-2 outline-none text-sm rounded-l-full"
                  />
                  <button className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition-colors rounded-r-full">
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="order-2 flex items-center gap-2">
            <button
              onClick={() => navigate("/wishlist")}
              className="p-2 rounded-full hover:bg-gray-100 hover:text-red-500 transition"
            >
              <Heart className="w-6 h-6" />
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="p-2 rounded-full hover:bg-gray-100 hover:text-red-500 transition"
            >
              <ShoppingCart className="w-6 h-6" />
            </button>

            {authSlice.user ? (
              <button
                onClick={() => navigate("/profile")}
                className="p-2 rounded-full hover:bg-gray-100 hover:text-red-500 transition"
              >
                <User2Icon className="w-6 h-6" />
              </button>
            ) : (
              <button
                onClick={() => navigate("/REGISTER")}
                className="p-2 rounded-full hover:bg-gray-100 hover:text-green-500 transition"
              >
                <UserPlus className="w-6 h-6" />
              </button>
            )}

            {authSlice.user ? (
              <button
                onClick={() => api.post("/auth/logout").then(() => window.location.replace("/"))}
                className="p-2 rounded-full hover:bg-gray-100 hover:text-red-500 transition"
              >
                <LogOut className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="p-2 rounded-full hover:bg-gray-100 hover:text-green-500 transition"
              >
                <LogIn className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
