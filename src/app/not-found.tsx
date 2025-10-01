"use client";

import Link from "next/link";
import { HiOutlineHome, HiOutlineArrowLeft } from "react-icons/hi";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6 sm:p-10">
      <div className="text-center max-w-xl w-full">
        <div className="mb-4">
          <span className="text-6xl sm:text-8xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            404
          </span>
        </div>
        <h1 className="text-text-primary text-2xl sm:text-3xl font-bold mb-2">
          Страница не найдена
        </h1>
        <p className="text-text-secondary mb-6">
          Похоже, вы перешли по несуществующему адресу. Проверьте URL или вернитесь на главную страницу.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="h-11 px-5 rounded-full bg-gradient-to-r from-primary to-secondary text-white inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <HiOutlineHome />
            <span>На главную</span>
          </Link>
          <button
            onClick={() => typeof window !== "undefined" && window.history.back()}
            className="h-11 px-5 rounded-full bg-surface border border-border text-text-primary inline-flex items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <HiOutlineArrowLeft />
            <span>Назад</span>
          </button>
        </div>
      </div>
    </div>
  );
}


