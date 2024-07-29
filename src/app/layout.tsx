import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryClientProvider from "./components/ReactQueryProvider";
import { AuthProvider } from "./hooks/useLogin";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "User Management",
  description: "User Management Web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <AuthProvider>
        <html lang="en">
          <body className={inter.className}>
            <ToastContainer/>
            {children}
          </body>
        </html>
      </AuthProvider>
    </ReactQueryClientProvider>
  );
}
