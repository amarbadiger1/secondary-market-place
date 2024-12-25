import React from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import SearchBar from "./SearchBar";

function Header() {
  const { user } = useUser();
  const role = user?.publicMetadata?.role || "";

  // Reusable button component
  const ActionButton = ({ to, children, variant = "default" }) => {
    const baseStyle =
      "px-3 py-1.5 text-sm rounded-lg transition border focus:outline-none focus:ring-2 focus:ring-offset-2";
    const variants = {
      default:
        "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-300 focus:ring-gray-200",
      primary:
        "bg-blue-600 text-white hover:bg-blue-700 border-blue-700 focus:ring-blue-700",
    };
    return (
      <Link to={to}>
        <button className={`${baseStyle} ${variants[variant]}`}>
          {children}
        </button>
      </Link>
    );
  };

  return (
    <div className="border-b">
      <div className="flex flex-col lg:flex-row items-center gap-4 p-4">
        {/* Logo Section */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <Link to="/" className="font-bold shrink-0">
            <img
              src={logo}
              alt="logo"
              width={100}
              height={100}
              className="w-24 lg:w-28"
              onError={(e) => (e.target.src = "/fallback-logo.png")}
            />
          </Link>

          {/* Mobile Actions */}
          <div className="lg:hidden">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-gray-100 text-gray-800 px-3 py-1.5 text-sm rounded-lg hover:bg-gray-200 transition border border-gray-300">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full lg:max-w-2xl">
          <SearchBar />
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:block ml-auto">
          <SignedIn>
            <div className="flex items-center gap-3">
              <ActionButton to="/sellticket" variant="primary">
                Sell Tickets
              </ActionButton>
              <ActionButton to="/myticket">My Tickets</ActionButton>
              {role === "admin" && (
                <ActionButton to="/admin/dashboard">Dashboard</ActionButton>
              )}
              <UserButton />
            </div>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-gray-100 text-gray-800 px-3 py-1.5 text-sm rounded-lg hover:bg-gray-200 transition border border-gray-300">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>

        {/* Mobile Actions */}
        <div className="lg:hidden w-full flex justify-center gap-3">
          <SignedIn>
            <ActionButton to="/sellticket" variant="primary">
              Sell Tickets
            </ActionButton>
            <ActionButton to="/myticket">My Tickets</ActionButton>
            {role === "admin" && (
              <ActionButton to="/admin/dashboard">Dashboard</ActionButton>
            )}
          </SignedIn>
        </div>
      </div>
    </div>
  );
}

export default Header;
