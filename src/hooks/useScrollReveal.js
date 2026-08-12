import { useEffect } from "react";

/**
 * Observa todos los elementos con la clase `.reveal` y les alterna la clase
 * `.show` al entrar/salir del viewport, de modo que la animación de aparición
 * se repite cada vez que el usuario vuelve a scrollear hasta ellos.
 *
 * Un MutationObserver re-registra los elementos que se montan después
 * (cambio de idioma, "Mostrar más" proyectos, certificados, etc.).
 * IntersectionObserver.observe es idempotente, así que re-observar es seguro.
 */
const useScrollReveal = () => {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("show", entry.isIntersecting);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    let rafId = 0;
    const observeAll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
      });
    };

    observeAll();

    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);
};

export default useScrollReveal;
