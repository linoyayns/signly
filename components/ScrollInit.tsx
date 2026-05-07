'use client';
import { useEffect } from 'react';

export function ScrollInit() {
  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));

    const nav = document.querySelector('nav');
    const handleScroll = () => {
      if (nav) nav.classList.toggle('nav-shadow', window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
}
