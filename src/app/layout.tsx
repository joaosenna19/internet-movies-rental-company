import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import AddMovieModal from "@/components/AddMovieModal";
import DeleteMovieModal from "@/components/DeleteMovieModal";
import EditMovieModal from "@/components/EditMovieModal";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Internet Movies Rental Company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        <NavBar />
        {children}
        <Footer />
        <Toaster/>
        <AddMovieModal />
        <EditMovieModal />
        <DeleteMovieModal />
        
      </body>
    </html>
  );
}
