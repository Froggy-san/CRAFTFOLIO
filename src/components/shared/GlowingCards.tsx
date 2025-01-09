import React, { useEffect, useRef } from "react";
import { Card } from "../ui/card";
import { GiCheckMark } from "react-icons/gi";

export default function GlowingCards() {
  const cardsContainer = useRef<HTMLDivElement>(null);

  const applyOverlayMask = (e: PointerEvent) => {
    const documentTarget = e.currentTarget as Element;

    if (!cardsContainer.current) {
      return;
    }

    const x = e.pageX - cardsContainer.current.offsetLeft;
    const y = e.pageY - cardsContainer.current.offsetTop;

    cardsContainer.current.setAttribute(
      "style",
      `--x: ${x}px; --y: ${y}px; --opacity: 1`,
    );
  };

  useEffect(() => {
    document.body.addEventListener("pointermove", applyOverlayMask);

    return () => {
      document.body.removeEventListener("pointermove", applyOverlayMask);
    };
  }, []);

  return (
    <>
      <main className="mt-24 w-full p-3 sm:p-7 md:p-14">
        <h1 className="main__heading">Pricing</h1>
        <div className="relative" ref={cardsContainer}>
          <div className="flex flex-wrap gap-5 md:gap-10">
            <Card className="flex min-w-[220px] flex-1 flex-col items-start gap-5 rounded-xl border border-solid border-gray-300 bg-gray-200 px-7 py-10 transition-colors hover:bg-gray-100 dark:border-[#eceff133] dark:bg-[#2b2b2b] dark:hover:bg-[#303030]">
              <h2 className="card__heading">Basic</h2>
              <p className="card__price">$0</p>
              <ul role="list" className="card__bullets flow">
                <li>
                  {" "}
                  <GiCheckMark className="mt-[0.3rem] h-3 w-3 shrink-0" />
                  Access to standard workouts and nutrition plans
                </li>
                <li>
                  {" "}
                  <GiCheckMark className="mt-[0.3rem] h-3 w-3 shrink-0" />
                  Email support
                </li>
              </ul>
              <a
                href="#basic"
                className="mt-auto block w-full rounded-lg bg-black p-2 text-center font-semibold text-white"
              >
                Get Started
              </a>
            </Card>
            <Card className="flex min-w-[220px] flex-1 flex-col items-start gap-5 rounded-xl border border-solid border-gray-300 bg-gray-200 px-7 py-10 transition-colors hover:bg-gray-100 dark:border-[#eceff133] dark:bg-[#2b2b2b] dark:hover:bg-[#303030]">
              <h2 className="card__heading">Pro</h2>
              <p className="card__price">$19.99</p>
              <ul role="list" className="card__bullets flow">
                <li>
                  {" "}
                  <GiCheckMark className="mt-[0.3rem] h-3 w-3 shrink-0" />
                  Access to advanced workouts and nutrition plans
                </li>
                <li>
                  {" "}
                  <GiCheckMark className="mt-[0.3rem] h-3 w-3 shrink-0" />
                  Priority Email support
                </li>
                <li>
                  {" "}
                  <GiCheckMark className="mt-[0.3rem] h-3 w-3 shrink-0" />
                  Exclusive access to live Q&A sessions
                </li>
              </ul>
              <a
                href="#pro"
                className="mt-auto block w-full rounded-lg bg-black p-2 text-center font-semibold text-white"
              >
                Upgrade to Pro
              </a>
            </Card>
            <Card className="flex min-w-[220px] flex-1 flex-col items-start gap-5 rounded-xl border border-solid border-gray-300 bg-gray-200 px-7 py-10 transition-colors hover:bg-gray-100 dark:border-[#eceff133] dark:bg-[#2b2b2b] dark:hover:bg-[#303030]">
              <h2 className="card__heading">Ultimate</h2>
              <p className="card__price">$29.99</p>
              <ul role="list" className="card__bullets flow">
                <li>
                  <GiCheckMark className="mt-[0.3rem] h-3 w-3 shrink-0" />
                  Access to all premium workouts and nutrition plans
                </li>
                <li>
                  <GiCheckMark className="mt-[0.3rem] h-3 w-3 shrink-0" />
                  24/7 Priority support
                </li>
                <li>
                  <GiCheckMark className="mt-[0.3rem] h-3 w-3 shrink-0" />
                  1-on-1 virtual coaching session every month
                </li>
                <li>
                  <GiCheckMark className="mt-[0.3rem] h-3 w-3 shrink-0" />
                  Exclusive content and early access to new features
                </li>
              </ul>
              <a
                href="#ultimate"
                className="mt-auto block w-full rounded-lg bg-black p-2 text-center font-semibold text-white"
              >
                Go Ultimate
              </a>
            </Card>
          </div>

          {/* twin cards */}
          <div
            className="overlay pointer-events-none absolute inset-0 flex select-none flex-wrap gap-5 md:gap-10"
            style={{
              opacity: "var(--opacity, 0)",
              mask: `
                radial-gradient(
                  25rem 25rem at var(--x) var(--y),
                  #000 1%,
                  transparent 50%
                )`,
              WebkitMask: `
                radial-gradient(
                  25rem 25rem at var(--x) var(--y),
                  #000 1%,
                  transparent 50%
                )`,
            }}
          >
            {/* card */}

            <div className="card-1 flex min-w-[220px] flex-1 flex-col items-start gap-5 rounded-xl border border-solid px-7 py-10 transition-colors">
              <h2 className="card__heading text-transparent">Basic</h2>
              <p className="card__price text-transparent">$9.99</p>
              <ul role="list" className="card__bullets flow text-transparent">
                <li>Access to standard workouts and nutrition plans</li>
                <li>Email support</li>
              </ul>
              <a
                href="#basic"
                className="btn mt-auto block w-full rounded-lg p-2 text-center font-semibold text-foreground text-white"
              >
                Get Started
              </a>
            </div>
            <div className="card-2 flex min-w-[220px] flex-1 flex-col items-start gap-5 rounded-xl border border-solid px-7 py-10 transition-colors">
              <h2 className="card__heading text-transparent">Pro</h2>
              <p className="card__price text-transparent">$19.99</p>
              <ul role="list" className="card__bullets flow text-transparent">
                <li>Access to advanced workouts and nutrition plans</li>
                <li>Priority Email support</li>
                <li>Exclusive access to live Q&A sessions</li>
              </ul>
              <a
                href="#pro"
                className="btn mt-auto block w-full rounded-lg p-2 text-center font-semibold text-white"
              >
                Upgrade to Pro
              </a>
            </div>
            <div className="card-3 py-10transition-colors flex min-w-[220px] flex-1 flex-col items-start gap-5 rounded-xl border border-solid px-7 py-10">
              <h2 className="card__heading text-transparent">Ultimate</h2>
              <p className="card__price text-transparent">$29.99</p>
              <ul role="list" className="card__bullets flow text-transparent">
                <li>Access to all premium workouts and nutrition plans</li>
                <li>24/7 Priority support</li>
                <li>1-on-1 virtual coaching session every month</li>
                <li>Exclusive content and early access to new features</li>
              </ul>
              <a
                href="#ultimate"
                className="btn mt-auto block w-full rounded-lg p-2 text-center font-semibold text-white"
              >
                Go Ultimate
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
