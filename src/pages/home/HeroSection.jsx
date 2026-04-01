import { useGSAP } from "@gsap/react";
import "./hero.css";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";

function HeroSection() {
  const ref = useRef();
  const isOpen = useRef(false);
  const menuTimelineRef = useRef(null);
  const menuItems = [
    { title: "Top", href: "#top" },
    { title: "Our Adventure", href: "#adventure" },
    { title: "Our Timeline", href: "#timeline" },
    { title: "My Scret For You", href: "#secret" },
  ];

  const { contextSafe } = useGSAP();

  const handleOpenMenu = contextSafe(() => {
    if (!menuTimelineRef.current) return;

    isOpen.current = !isOpen.current;

    if (isOpen.current) {
      menuTimelineRef.current.play();
    } else {
      menuTimelineRef.current.reverse();
    }
  });

  useGSAP(
    () => {
      document.body.style.overflow = "hidden";
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "auto";

          // ScrollTrigger.refresh();
          scrollAnimationSection1();
        },
      });

      loadingAnimation(tl);

      loadingIntroSection(tl);

      loadingIntroSection2();
      scrollAnimationSection2();

      menuTimelineRef.current = gsap
        .timeline({ paused: true })
        .to(
          ".ri-menu-line",
          { duration: 0.25, yPercent: -100, opacity: 0 },
          "same",
        )
        .to(
          ".ri-close-line",
          { duration: 0.25, yPercent: -100, opacity: 1 },
          "same",
        )
        .to(
          ".menu-container",
          {
            xPercent: -100,
            duration: 0.4,
            ease: "power1.inOut",
          },
          "same",
        )
        .to(".menu-item", {
          xPercent: -100,
          duration: 0.5,
          opacity: 1,
          stagger: 0.1,
          ease: "power1.inOut",
        });
    },
    { scope: ref },
  );

  return (
    <section id="top" className="w-full overflow-x-hidden" ref={ref}>
      {/* <div className="loading-container container w-full h-screen fixed z-[9999]">
        {imgs.map((src, idx) => (
          <div
            className={`loading-img loading-img_${idx}`}
            key={`loading_img_${src}`}
          >
            <img src={src} alt="" />
          </div>
        ))}
      </div> */}

      <nav className="w-full container flex items-center justify-between p-4 fixed z-[999] text-orange">
        <img
          src="/img/logo.png"
          className="logo w-20 aspect-square drop-shadow-md"
          alt=""
        />

        <div
          className="w-[36px] h-[36px] text-xl p-2 bg-white leading-none rounded-full shadow-md flex flex-col overflow-hidden"
          onClick={handleOpenMenu}
        >
          <i className="ri-menu-line opacity-100"></i>
          <i className="ri-close-line opacity-0"></i>
        </div>
      </nav>

      <div className="right-0 top-0 w-full h-full bg-[#E5CBBB]/95 fixed z-[998] pt-40 menu-container translate-x-full">
        <div className="h-full px-5">
          <div className="space-y-3">
            {menuItems.map((i, idx) => (
              <a
                key={i.href}
                href={i.href}
                className="menu-item w-full block text-left px-4 py-3 rounded-2xl bg-white/85 border border-white shadow-sm text-orange font-semibold tracking-wide hover:bg-white transition-colors duration-300 translate-x-full opacity-0"
                onClick={handleOpenMenu}
              >
                <span className="mr-2 text-sm opacity-70">
                  {(idx + 1).toString().padStart(2, "0")}
                </span>
                {i.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="relative hero-section w-full">
        <div className="intro relative w-full h-screen flex flex-col items-center justify-center p-4">
          <img
            src={"/img/intro_left.png"}
            alt=""
            className="intro-polaroid intro-polaroid__left absolute w-48 h-auto z-20"
          />

          <img
            src={"/img/intro_right.png"}
            className="intro-polaroid intro-polaroid__right absolute w-48 h-auto z-20"
            alt=""
          />

          <img
            src={"/img/intro_center.png"}
            alt=""
            className="intro-polaroid intro-polaroid__center absolute w-48 h-auto z-30"
          />

          <h1
            className="relative font-bold italic text-5xl px-6 text-center text-balance break-words mb-5 z-40 text-white"
            style={{
              letterSpacing: "5px",
              // textShadow: "0px 2px 0px #fbc531, 0px 2px 0px #a37c13",

              textShadow: `0px 1px 0px #fbc531,
                0px 2px 0px #fbc531,
                0px 3px 0px #fbc531,
                0px 4px 0px #fbc531,
                0px 5px 0px #fbc531,
                0px 6px 0px #fbc531,
                0px 7px 0px #fbc531,
                0px 8px 0px #fbc531,
                1px 15px 10px rgba(16, 16, 16, 0.3),
                1px 20px 20px rgba(16, 16, 16, 0.2),
                1px 25px 40px rgba(16, 16, 16, 0.2),
                1px 30px 80px rgba(16, 16, 16, 0.3)`,
            }}
          >
            Tuberose & Broccoli
          </h1>

          <h2 className="relative z-30 bg-black px-2 py-1 -rotate-1 flex items-center gap-1">
            <span className="font-cyrene text-4xl font-light text-white">
              Since <span className="font-extrabold text-orange">the day</span>{" "}
              we met
            </span>

            <i className="ri-heart-fill text-2xl text-orange"></i>
          </h2>

          <div
            className="bg-round aspect-square absolute border-solid rounded-full border-white bg-yellow-50 border-4, opacity-35"
            style={{ width: "120%" }}
          ></div>

          <div
            className="bg-round aspect-square absolute border-solid rounded-full border-white bg-blue-400 border-4 opacity-20 -top-8 right-0"
            style={{ width: "50%" }}
          ></div>

          <div
            className="bg-round aspect-square absolute border-solid rounded-full border-white bg-blue-400 border-4 opacity-20 -bottom-8 left-0"
            style={{ width: "50%" }}
          ></div>
        </div>

        <div className="intro_2 relative h-screen flex items-center">
          <img
            src="img/polaroid_intro2.svg"
            alt=""
            className="polaroid-intro2__right floating-top absolute w-1/2 right-0 top-0"
            style={{
              transform: "rotateX(344deg), rotateY(326deg), rotateZ(351deg)",
              filter: "drop-shadow(4px 8px 4px rgb(0 0 0/ 0.1))",
            }}
          />
          <img
            src="img/polaroid2_intro2.svg"
            alt=""
            className="polaroid-intro2__left floating-top absolute w-1/2 left-0 bottom-0"
            style={{
              transform: "rotateY(33deg)",
              filter: "drop-shadow(rgba(0, 0, 0, 0.1) 4px 8px 4px)",
            }}
          />

          <img
            src="/img/star1.webp"
            className="img-show floating-top w-16 absolute top-1/4 left-10"
            alt=""
          />

          <p className="text-balance text-center text-[#ff5c28] px-2 relative">
            Every love story is beautiful, but ours is my favorite. Welcome to a
            little corner of the internet where I collected our moments, our
            laughs, our dreams—and a question from my heart.
            <img
              src="/img/heart_pink3.webp"
              className="img-show floating-top w-10 absolute -bottom-2/4 right-8"
              alt=""
            />
          </p>

          <img
            src="img/cloud_left.webp"
            alt=""
            className="absolute cloud__left"
          />
          <img
            src="img/cloud_right.webp"
            alt=""
            className="absolute cloud__right"
          />
        </div>
      </div>
    </section>
  );
}

function loadingAnimation(tl) {
  tl.fromTo(
    ".loading-img",
    {
      scale: 0,
      xPercent: -50,
      yPercent: -50,
    },
    {
      scale: 1,
      duration: 1,
      stagger: 0.4,
    },
  );

  tl.to(".loading-img", {
    rotate: 0,
    delay: 0.2,
    yPercent: 500,
    duration: 1,
    stagger: -0.3,
  });

  tl.to(
    ".loading-container",
    {
      xPercent: 100,
      duration: 0.5,
      opacity: 0,
      display: "none",
    },
    "-=0.2",
  );
}

function loadingIntroSection(tl) {
  const title = SplitText.create(".intro h1", { type: "chars" });

  tl.from("nav .logo, nav i", {
    opacity: 0,
    y: 10,
    stagger: 0.2,
    duration: 0.4,
  });

  tl.fromTo(
    ".intro-polaroid",
    {
      scale: 0,
    },
    {
      scale: 1,
      stagger: 0.2,
    },
    "polaroid",
  );

  tl.fromTo(
    ".intro-polaroid__left",
    {
      xPercent: 0,
      yPercent: 0,
    },
    {
      xPercent: -90,
      yPercent: -60,
      duration: 0.4,
      rotateZ: -10,
    },
    "spread-polaroid",
  );

  tl.fromTo(
    ".intro-polaroid__right",
    {
      xPercent: 0,
      yPercent: 0,
    },
    {
      xPercent: 85,
      yPercent: 75,
      duration: 0.4,
      rotateZ: 10,
    },
    "spread-polaroid",
  );

  tl.fromTo(
    title.chars,
    {
      opacity: 0,
      skewX: -30,
      filter: "blur(10px) brightness(0%)",
      willChange: "filter, transform",
    },
    {
      opacity: 1,
      skewX: 0,
      filter: "blur(0px) brightness(100%)",
      duration: 0.5,
      stagger: 0.05,
      ease: "power2.inOut",
    },
  );

  tl.fromTo(
    ".intro h2",
    { width: 0, opacity: 0 },
    { width: "auto", opacity: 1, duration: 0.4 },
    "-=0.3",
  );

  tl.from(
    ".bg-round",
    {
      scale: 0,
    },
    "-=0.3",
  );
}

function scrollAnimationSection1() {
  const introScrollTrigger = gsap.timeline({
    scrollTrigger: {
      trigger: ".intro",
      scrub: 0.5,
      start: "bottom bottom",
    },
  });

  introScrollTrigger
    .fromTo(
      ".intro-polaroid__right",
      {
        yPercent: 75,
      },
      {
        yPercent: 65,
      },
    )
    .fromTo(
      ".intro-polaroid__left",
      { yPercent: -60 },
      {
        yPercent: -70,
      },
      0,
    )
    .fromTo(
      ".intro-polaroid__center",
      {
        yPercent: 0,
      },
      {
        yPercent: -10,
      },
      0,
    );
}

function loadingIntroSection2() {
  const intro2ScrollTrigger = gsap.timeline({
    scrollTrigger: {
      trigger: ".intro_2",
      start: "top 20%",
      end: "bottom bottom",
      scrub: 0.5,
    },
  });

  intro2ScrollTrigger
    .to(
      ".cloud__right",
      {
        duration: 2,
        xPercent: 200,
      },
      "cloud_move",
    )
    .to(
      ".cloud__left",
      {
        duration: 2,
        xPercent: -200,
      },
      "cloud_move",
    );
}

function scrollAnimationSection2() {
  gsap.to(".floating-top", {
    yPercent: -60,
    scrollTrigger: {
      trigger: ".intro_2",
      start: "top center",
      end: "bottom top",
      scrub: 0.5,
    },
  });
}

export default HeroSection;
