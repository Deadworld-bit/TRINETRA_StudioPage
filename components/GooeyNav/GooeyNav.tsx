"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import styles from "./GooeyNav.module.css";

interface GooeyNavItem {
  label: string;
  href: string;
}

export interface GooeyNavProps {
  items: GooeyNavItem[];
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  colors?: number[];
  initialActiveIndex?: number;
  textClass?: string;
}

const GooeyNav: React.FC<GooeyNavProps> = ({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
  textClass = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(initialActiveIndex);

  const noise = (n = 1) => n / 2 - Math.random() * n;
  const getXY = (
    distance: number,
    pointIndex: number,
    totalPoints: number
  ): [number, number] => {
    const angle =
      ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

    const createParticle = (
    i: number,
    t: number,
    d: [number, number],
    r: number
  ) => {
    const rotate = noise(r / 10); 
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  };

  const makeParticles = (element: HTMLElement) => {
    const d: [number, number] = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty("--time", `${bubbleTime}ms`);
    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove(styles.active);
      setTimeout(() => {
        const particle = document.createElement("span");
        const point = document.createElement("span");
        particle.classList.add(styles.particle);
        particle.style.setProperty("--start-x", `${p.start[0]}px`);
        particle.style.setProperty("--start-y", `${p.start[1]}px`);
        particle.style.setProperty("--end-x", `${p.end[0]}px`);
        particle.style.setProperty("--end-y", `${p.end[1]}px`);
        particle.style.setProperty("--time", `${p.time}ms`);
        particle.style.setProperty("--scale", `${p.scale}`);
        particle.style.setProperty("--color", `var(--color-${p.color}, white)`);
        particle.style.setProperty("--rotate", `${p.rotate}deg`);
        point.classList.add(styles.point);
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => {
          element.classList.add(styles.active);
        });
        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch {}
        }, t);
      }, 30);
    }
  };

  const updateEffectPosition = (element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    const stylesObj = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    };
    Object.assign(filterRef.current.style, stylesObj);
    Object.assign(textRef.current.style, stylesObj);
    textRef.current.innerText = element.innerText;
  };

  const handleClick = (e: React.MouseEvent<HTMLLIElement>, index: number) => {
    const liEl = e.currentTarget;
    if (activeIndex === index) return;
    setActiveIndex(index);
    updateEffectPosition(liEl);
    if (filterRef.current) {
      const particles = filterRef.current.querySelectorAll(
        `.${styles.particle}`
      );
      particles.forEach((p) => filterRef.current!.removeChild(p));
    }
    if (textRef.current) {
      textRef.current.classList.remove(styles.active);
      void textRef.current.offsetWidth;
      textRef.current.classList.add(styles.active);
    }
    if (filterRef.current) {
      makeParticles(filterRef.current);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLAnchorElement>,
    index: number
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const liEl = e.currentTarget.parentElement;
      if (liEl) {
        handleClick(
          { currentTarget: liEl } as React.MouseEvent<HTMLLIElement>,
          index
        );
      }
    }
  };

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const activeLi = navRef.current.querySelectorAll("li")[
      activeIndex
    ] as HTMLElement;
    if (activeLi) {
      updateEffectPosition(activeLi);
    }
    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll("li")[
        activeIndex
      ] as HTMLElement;
      if (currentActiveLi) {
        updateEffectPosition(currentActiveLi);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex]);

  useEffect(() => {
    if (!navRef.current || !filterRef.current || !textRef.current) return;
    const activeLi = navRef.current.querySelectorAll("li")[
      activeIndex
    ] as HTMLElement;
    if (activeLi) {
      updateEffectPosition(activeLi);
      const particles = filterRef.current.querySelectorAll(
        `.${styles.particle}`
      );
      particles.forEach((p) => filterRef.current!.removeChild(p));
      textRef.current.classList.remove(styles.active);
      void textRef.current.offsetWidth;
      textRef.current.classList.add(styles.active);
      makeParticles(filterRef.current);
    }
  }, []);

  return (
    <div
      className={`${styles.gooeyNavVars} relative overflow-hidden`}
      ref={containerRef}
    >
      <nav
        className="flex relative"
        style={{ transform: "translate3d(0,0,0.01px)" }}
      >
        <ul
          ref={navRef}
          className={`flex gap-4 list-none p-0 px-4 m-0 relative z-[3] ${textClass}`}
          style={{
            textShadow: "0 1px 1px hsl(205deg 30% 10% / 0.2)",
          }}
        >
          {items.map((item, index) => (
            <li
              key={index}
              className={`${styles.navItem} ${
                activeIndex === index ? styles.navItemActive : ""
              }`}
            >
              <Link
                href={item.href}
                className="outline-none"
                onClick={(e) => {
                  if (activeIndex === index) {
                    e.preventDefault();
                    return;
                  }
                  setActiveIndex(index);
                  const liEl = e.currentTarget.parentElement as HTMLLIElement;
                  if (liEl) {
                    updateEffectPosition(liEl);
                    if (filterRef.current) {
                      const particles = filterRef.current.querySelectorAll(
                        `.${styles.particle}`
                      );
                      particles.forEach((p) =>
                        filterRef.current!.removeChild(p)
                      );
                    }
                    if (textRef.current) {
                      textRef.current.classList.remove(styles.active);
                      void textRef.current.offsetWidth;
                      textRef.current.classList.add(styles.active);
                    }
                    if (filterRef.current) {
                      makeParticles(filterRef.current);
                    }
                  }
                }}
                onKeyDown={(e) => handleKeyDown(e, index)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <span className={`${styles.effect} ${styles.filter}`} ref={filterRef} />
      <span className={`${styles.effect} ${styles.text}`} ref={textRef} />
    </div>
  );
};

export default GooeyNav;
