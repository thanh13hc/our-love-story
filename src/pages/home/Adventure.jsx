import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

function Adventure() {
  const timelineRef = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".timeline-title",
          start: "top top",
          end: "+=400%",
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        ".adventure-1",
        {
          transform: "rotateZ(-10deg) translateX(-5%)",
        },
        {
          duration: 12,
          transform: "rotateZ(-10deg) translateX(-395%)",
          ease: "power3.in",
        },
        "scroll_trigger",
      );

      tl.fromTo(
        ".adventure-2",
        {
          transform: "rotateZ(-5deg) translateX(-395%)",
        },
        {
          duration: 12,
          transform: "rotateZ(-5deg) translateX(-5%)",
          ease: "power3.in",
        },
        "scroll_trigger",
      );

      tl.fromTo(
        ".float-up",
        { scale: 0.8, height: 0 },
        {
          yPercent: -10,
          scale: 1.05,
          duration: 4,
          height: "auto",
          ease: "elastic.inOut",
        },
        "scroll_trigger",
      );

      tl.fromTo(
        ".bg-float-top",
        {
          yPercent: 0,
        },
        { yPercent: -66, duration: 10, ease: "power2.in" },
        "scroll_trigger",
      );

      tl.fromTo(
        ".bg-float-top > *",
        {
          rotateZ: 0,
        },
        { rotateZ: -360, duration: 10, ease: "power2.in" },
        "scroll_trigger",
      );
    },

    { scope: timelineRef },
  );

  return (
    <section ref={timelineRef} className="relative">
      <div className="timeline-title w-full h-screen flex items-center justify-center flex-col relative overflow-x-hidden">
        <div
          className="w-full h-full absolute top-0 left-0 overflow-y-visible"
          style={{
            contain: "layout",
          }}
        >
          <div
            className="bg-float-top w-full absolute h-[250vh] -z-10"
            style={{
              contain: "layout",
            }}
          >
            <img
              className="absolute top-[10%] left-[5%] inline-block w-[10rem]"
              src="/img/LetterH.webp"
              alt=""
            />
            <img
              className="absolute top-[15%] left-10 inline-block w-[3rem]"
              src="/img/star1.webp"
              alt=""
            />
            <img
              className="absolute top-[15%] -right-4 inline-block w-[10rem]"
              src="/img/LetterA.webp"
              alt=""
            />
            <img
              className="absolute top-[25%] right-24 inline-block w-[3rem]"
              src="/img/star2.webp"
              alt=""
            />
            <img
              className="absolute top-[25%] -left-5 inline-block w-[10rem]"
              src="/img/LetterP1.webp"
              alt=""
            />
            <img
              className="absolute top-[22.5%] left-20 inline-block w-[5rem]"
              src="/img/hero_ornament.webp"
              alt=""
            />
            <img
              className="absolute top-[40%] -right-3 inline-block w-[8rem]"
              src="/img/LetterP2.webp"
              alt=""
            />
            <img
              className="absolute top-[44%] left-10 inline-block w-[3rem]"
              src="/img/heart_pink3.webp"
              alt=""
            />

            <img
              className="absolute top-[53%] left-20 inline-block w-[8rem]"
              src="/img/LetterY.webp"
              alt=""
            />

            <img
              className="absolute top-[50%] left-6 inline-block w-[8rem]"
              src="/img/Daisy1.webp"
              alt=""
            />

            <img
              className="absolute top-[63%] right-0 inline-block w-[10rem]"
              src="/img/hero_swirl.webp"
              alt=""
            />
            <img
              className="absolute top-[68%] right-10 inline-block w-[2.5rem]"
              src="/img/star4.webp"
              alt=""
            />

            <img
              className="absolute top-[73%] left-10 inline-block w-[3rem]"
              src="/img/lol.webp"
              alt=""
            />
            <img
              className="absolute top-[80%] right-10 inline-block w-[3rem]"
              src="/img/rofl.webp"
              alt=""
            />

            <img
              className="absolute top-[80%] left-1/3 inline-block w-[5rem]"
              src="/img/hero_smiley.webp"
              alt=""
            />

            <img
              className="absolute top-[88%] -left-[15%] inline-block w-60"
              src="/img/cloud_left.webp"
              alt=""
            />

            <img
              className="absolute top-[95%] left-1/2 inline-block w-[3rem]"
              src="/img/lmao.webp"
              alt=""
            />
          </div>

          <div className="w-full adventure-1 flex absolute top-[5%] left-0 z-10 drop-shadow-lg">
            <img
              src="/img/adventure_img_1.svg"
              className="h-auto w-auto"
              alt=""
            />
            <img
              src="/img/adventure_img_2.svg"
              className="h-auto w-auto"
              alt=""
            />
            <img
              src="/img/adventure_img_3.svg"
              className="h-auto w-auto"
              alt=""
            />
            <img
              src="/img/adventure_img_4.svg"
              className="h-auto w-auto"
              alt=""
            />
            <img
              src="/img/adventure_img_5.svg"
              className="h-auto w-auto"
              alt=""
            />
          </div>

          <div className="w-full adventure-2 flex absolute bottom-[5%] left-0 z-10 drop-shadow-lg">
            <img
              src="/img/adventure_img_6.svg"
              className="h-auto w-auto"
              alt=""
            />
            <img
              src="/img/adventure_img_7.svg"
              className="h-auto w-auto"
              alt=""
            />
            <img
              src="/img/adventure_img_8.svg"
              className="h-auto w-auto"
              alt=""
            />
            <img
              src="/img/adventure_img_9.svg"
              className="h-auto w-auto"
              alt=""
            />
            <img
              src="/img/adventure_img_10.svg"
              className="h-auto w-auto"
              alt=""
            />
          </div>
        </div>

        <img
          src="/img/icon-magic.png"
          className="w-[18px] aspect-square relative z-10 drop-shadow-lg"
          alt=""
        />
        <h2
          className="font-apple-garamond text-blue text-7xl font-bold relative z-10 drop-shadow-lg"
          style={{ fontSize: "6rem", letterSpacing: "2px" }}
        >
          Our
        </h2>
        <img
          src="/img/adventure_title.png"
          className="float-up w-[90%] h-auto inline-block mt-3 relative z-10 drop-shadow-lg"
          alt=""
        />
        <p className="text-sm text-center text-blue mt-5 mx-5 relative z-10 drop-shadow-lg">
          Every photograph captures a moment, but these images hold the essence
          of who we are together—two souls building a beautiful story, one day
          at a time.
        </p>
      </div>
    </section>
  );
}

export default Adventure;
