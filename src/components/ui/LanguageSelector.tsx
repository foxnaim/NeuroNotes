"use client";

import * as React from "react";
import { SUPPORTED_LANGUAGES, type Language } from "@/lib/constants";
import { Select } from "./Select";

export interface LanguageSelectorProps {
  value: Language;
  onChange: (lang: Language) => void;
  className?: string;
}

export function LanguageSelector({
  value,
  onChange,
  className,
}: LanguageSelectorProps) {
  const options = SUPPORTED_LANGUAGES.map((lang) => ({
    value: lang.code,
    label: lang.label,
  }));

  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value as Language)}
      options={options}
      className={className}
    />
  );
}

