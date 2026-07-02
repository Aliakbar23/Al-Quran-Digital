"use client";
import { useEffect } from "react";

export default function RegisterSW() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      // Mendaftarkan service worker dari /sw.js
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("Service Worker terdaftar dengan scope:", reg.scope);

          // Cek jika ada update Service Worker baru di server
          reg.addEventListener("updatefound", () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed") {
                  if (navigator.serviceWorker.controller) {
                    console.log("Service Worker baru terpasang dan siap.");
                  }
                }
              });
            }
          });
        })
        .catch((err) => {
          console.error("Service Worker gagal didaftarkan:", err);
        });

      // Reload halaman otomatis ketika controller berubah (Service Worker baru aktif & claim control)
      let refreshing = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (!refreshing) {
          refreshing = true;
          console.log("Service Worker baru aktif, memuat ulang halaman untuk memperbarui aset...");
          window.location.reload();
        }
      });
    }
  }, []);

  return null;
}
