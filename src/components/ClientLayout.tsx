'use client';

import Header from "@/components/Header";
import BottomNavigationBar from "@/components/BottomNavigationBar";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="content-root flex-1 overflow-auto pb-24">
          {children}
        </main>
      <BottomNavigationBar />
    </div>
  );
}

