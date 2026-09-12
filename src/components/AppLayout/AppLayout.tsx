import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";

export function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
