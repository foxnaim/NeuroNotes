"use client";

import * as React from "react";

export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export function mergeRefs<T>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(value);
      } else {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (ref as any).current = value;
        } catch {
          // ignore
        }
      }
    });
  };
}

