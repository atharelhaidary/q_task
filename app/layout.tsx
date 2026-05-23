import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import AppProvider from "../frontend/shared/providers/AppProvider";


export const metadata: Metadata = {
  title: "Trello Task",
};

export  default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
    // layout page
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="h-screen relative flex flex-center">
          <AntdRegistry>
           <Suspense>
                  <AppProvider>
                            <main className="flex h-full  container">
                              {children}
                            </main>
                  </AppProvider>
            
            </Suspense>
          </AntdRegistry>
      </body>
    </html>
  );
}
