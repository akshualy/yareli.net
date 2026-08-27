"use client";

import { useEffect, useState } from "react";

export function useWideDesktop() {
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1280px) and (pointer: fine)");
    const sync = () => setWide(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return wide;
}
