import { Outlet } from "react-router-dom";
import { Header } from "./header";

export const PublicLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};
