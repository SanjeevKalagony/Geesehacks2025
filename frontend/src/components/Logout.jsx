import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();

    // Notify Navbar about logout change
    window.dispatchEvent(new Event("authChange"));

    navigate("/");
  }, [navigate]);

  return null;
}
