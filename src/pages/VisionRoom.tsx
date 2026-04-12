import AppShell from "@/components/AppShell";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function VisionRoom() {
  const navigate = useNavigate();
  useEffect(() => { navigate("/dashboard", { replace: true }); }, []);
  return null;
}
