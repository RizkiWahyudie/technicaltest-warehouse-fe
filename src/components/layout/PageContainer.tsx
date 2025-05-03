import { ReactNode } from "react";
import Head from "next/head";

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

const PageContainer = ({
  children,
  title = "Aplikasi Produk",
  className = "",
}: PageContainerProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Manajemen Produk" />
      </Head>

      <div className={`min-h-screen bg-gray-50 ${className}`}>
        <main className="container mx-auto px-4 py-8">{children}</main>
      </div>
    </>
  );
};

export default PageContainer;
