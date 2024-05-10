import "./globals.css";
import Layout from "../layout/Layout";
import { Metadata } from "next/types";
import NoSsr from "../components/NoSsr";

export const metadata: Metadata = {
  title: "accelerator-DeFI-EIP",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NoSsr>
          <Layout></Layout>
        </NoSsr>
      </body>
    </html>
  );
}
