import { FC } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export const Layout: FC = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen  '>
      <Navbar />
      <main className='max-w-7xl mx-auto  w-full'>{children}</main>
      <Footer />
    </div>
  );
};
