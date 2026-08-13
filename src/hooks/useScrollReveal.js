import { useEffect } from "react";

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

    const observed = new WeakSet();
    let knownCount = -1;
    let timeoutId = 0;

    const scan = () => {
      const elements = document.querySelectorAll(".reveal");
      if (elements.length === knownCount) return;
      knownCount = elements.length;

      elements.forEach((el) => {
        if (observed.has(el)) return;
        observed.add(el);
        io.observe(el);
      });
    };

    const scheduleScan = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(scan, 150);
    };

    scan();

    const mo = new MutationObserver(scheduleScan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timeoutId);
      mo.disconnect();
      io.disconnect();
    };
  }, []);
};

export default useScrollReveal;
