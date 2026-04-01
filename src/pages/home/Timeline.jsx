import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const TIMELINES = [
  {
    id: "entry-2022",
    year: "2022",
    images: [
      {
        position: "top-1/4 left-0",
        width: "w-36",
        aspectRatio: "aspect-square",
        src: "/img/tl_2022_1_1.jpg",
      },
      {
        position: "top-12 right-0",
        width: "w-40",
        aspectRatio: "aspect-[3/4]",
        src: "/img/tl_2022_4_3.jpg",
      },

      {
        position: "bottom-0 left-1/10",
        width: "w-60",
        aspectRatio: "aspect-video",
        src: "/img/tl_2022_16_9.jpg",
      },
    ],
  },
  {
    id: "entry-2023",
    year: "2023",
    images: [
      {
        position: "top-1/4 left-0",
        width: "w-36",
        aspectRatio: "aspect-square",
        src: "/img/tl_2023_1_1.jpg",
      },
      {
        position: "top-12 right-0",
        width: "w-40",
        aspectRatio: "aspect-[3/4]",
        src: "/img/tl_2023_4_3.jpg",
      },

      {
        position: "bottom-0 left-1/10",
        width: "w-60",
        aspectRatio: "aspect-video",
        src: "/img/tl_2023_16_9.jpg",
      },
    ],
  },
  {
    id: "entry-2024",
    year: "2024",
    images: [
      {
        position: "top-1/4 left-0",
        width: "w-36",
        aspectRatio: "aspect-square",
        src: "/img/tl_2024_1_1.jpg",
      },
      {
        position: "top-12 right-0",
        width: "w-40",
        aspectRatio: "aspect-[3/4]",
        src: "/img/tl_2024_4_3.jpg",
      },

      {
        position: "bottom-0 left-1/10",
        width: "w-60",
        aspectRatio: "aspect-video",
        src: "/img/tl_2024_16_9.jpg",
      },
    ],
  },
  {
    id: "entry-2025",
    year: "2025",
    images: [
      {
        position: "top-1/4 left-0",
        width: "w-36",
        aspectRatio: "aspect-square",
        src: "/img/tl_2025_1_1.jpg",
      },
      {
        position: "top-12 right-0",
        width: "w-40",
        aspectRatio: "aspect-[3/4]",
        src: "/img/tl_2025_4_3.jpg",
      },

      {
        position: "bottom-0 left-1/10",
        width: "w-60",
        aspectRatio: "aspect-video",
        src: "/img/tl_2025_16_9.jpg",
      },
    ],
  },
  {
    id: "entry-now",
    year: "Now",
    images: [
      {
        position: "top-1/4 left-0",
        width: "w-36",
        aspectRatio: "aspect-square",
        src: "/img/tl_2026_1_1.jpg",
      },
      {
        position: "top-12 right-0",
        width: "w-40",
        aspectRatio: "aspect-[3/4]",
        src: "/img/tl_2026_4_3.png",
      },

      {
        position: "bottom-0 left-1/10",
        width: "w-60",
        aspectRatio: "aspect-video",
        src: "/img/tl_2026_16_9.jpg",
      },
    ],
  },
];

function Timeline() {
  const timelineRef = useRef();
  const years = getYears();

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      tl.to(
        ".flow-top",
        {
          yPercent: -150,
        },
        "scroll-trigger",
      );

      tl.to(
        ".flow-top-x2",
        {
          yPercent: -800,
        },
        "scroll-trigger",
      );

      tl.to(
        ".timeline-title",
        {
          y: 50,
        },
        "-=0.5",
      );

      const articles = gsap.utils.toArray("article");
      const years = gsap.utils.toArray('[data-timeline="year"]');

      years.forEach((year, idx) => {
        const chars = year.querySelectorAll(".char");
        gsap.set(chars, {
          yPercent: idx === 0 ? 0 : 100,
          opacity: idx === 0 ? 1 : 0,
        });
      });

      articles.forEach((article, idx) => {
        if (idx === 0) return;

        const currentYearChars = years[idx - 1].querySelectorAll(".char");
        const currentYearImg = articles[idx - 1].querySelectorAll("img");

        const nextYearChars = years[idx].querySelectorAll(".char");
        const nextYearImg = articles[idx].querySelectorAll("img");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: article,
            start: "top bottom",
            end: "top top",
            scrub: 0.5,
          },
        });

        tl.to(
          currentYearChars,
          {
            yPercent: -100,
            opacity: 0,
            duration: 4,
            stagger: 1,
            ease: "cubic-bezier(0.23, 1, 0.32, 1)",
          },
          "char",
        );
        tl.fromTo(
          currentYearImg,
          { xPercent: 0, opacity: 1 },
          {
            xPercent: -100,
            opacity: 0,
            stagger: 1,
            duration: 2,
          },
          "-=4",
        );

        tl.to(
          nextYearChars,
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 4,
            stagger: 1,
            ease: "cubic-bezier(0.23, 1, 0.32, 1)",
          },
          "char",
        );

        tl.fromTo(
          nextYearImg,
          { scale: 1.2, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 1, duration: 2 },
          "-=3",
        );
      });
    },
    { scope: timelineRef },
  );

  return (
    <section id="timeline" ref={timelineRef} className="relative">
      <div className="w-full h-full overflow-x-hidden">
        <div
          className="w-full h-full absolute overflow-y-visible"
          style={{
            contain: "layout",
          }}
        >
          <img
            src="/img/cloud_right.webp"
            className="flow-top absolute top-0 -right-[40px] w-72"
            alt=""
          />
          <img
            src="/img/cloud_left.webp"
            className="flow-top absolute left-0 top-[14%] -translate-x-1/3 w-72"
            alt=""
          />
          <img
            src="/img/KittyBlob.webp"
            className="flow-top-x2 absolute rotate-180 left-4 top-[23%] w-20"
            alt=""
          />
          <img
            src="/img/star1.webp"
            className="flow-top-x2 absolute top-[35%] right-3 w-10"
            alt=""
          />
          <img
            src="/img/ornament_pink.webp"
            className="flow-top-x2 absolute left-4 top-[51%] w-[70px]"
            alt=""
          />
          <img
            src="/img/hugme_pillow.webp"
            className="flow-top-x2 absolute top-[54%] right-5 w-[100px] -rotate-12"
            alt=""
          />

          <img
            src="/img/cloud_left.webp"
            className="flow-top-x2 absolute top-[67%] -left-1/3 w-80"
            alt=""
          />

          <img
            src="/img/star2.webp"
            className="flow-top-x2 absolute top-[65%] left-3 w-12"
            alt=""
          />

          <img
            src="/img/heart_pink3.webp"
            className="flow-top-x2 absolute top-[67%] right-5 w-9"
            alt=""
          />

          <img
            src="/img/hero_smiley.webp"
            className="flow-top-x2 absolute top-[82%] rotate-[30deg] left-0 w-24"
            alt=""
          />

          <img
            src="/img/believe.webp"
            className="flow-top-x2 absolute top-[90%] right-2 w-20"
            alt=""
          />

          <img
            src="/img/hero_ornament.webp"
            className="flow-top-x2 absolute top-[90%] left-1/3 w-24"
            alt=""
          />

          <img
            src="/img/smile_egg.gif"
            className="flow-top-x2 absolute top-[114.5%] left-0 w-32"
            alt=""
          />
          <img
            src="/img/pencil.webp"
            className="flow-top-x2 absolute top-[116.5%] -left-1 -rotate-[18deg] w-8"
            alt=""
          />

          <img
            src="/img/cloud_rain.gif"
            className="flow-top-x2 absolute top-[104.5%] left-0 w-32"
            alt=""
          />

          <img
            src="/img/planet_spin.gif"
            className="flow-top-x2 absolute top-[113%] right-0 w-32"
            alt=""
          />

          <img
            src="/img/plant_flow.gif"
            className="flow-top-x2 absolute top-[118%] -right-5 rotate-12 w-32"
            alt=""
          />
        </div>
      </div>

      <div className="timeline-title w-full h-screen flex items-center justify-center flex-col">
        <img
          src="/img/icon-magic.png"
          className="w-[18px] aspect-square"
          alt=""
        />
        <h2
          className="font-apple-garamond text-blue text-7xl font-bold"
          style={{ fontSize: "6rem", letterSpacing: "2px" }}
        >
          Our
        </h2>
        <img
          src="/img/tl_title.png"
          className="w-[70%] h-auto inline-block -mt-1"
          alt=""
        />
        <p className="text-sm text-center text-blue mt-5 mx-5">
          From that first meeting to now, our journey together has been filled
          with unforgettable moments. Each chapter has brought us closer,
          building a story that&apos;s uniquely ours.
        </p>
      </div>

      <div className="relative">
        <ul>
          {TIMELINES.map((timeline) => (
            <li key={timeline.id}>
              <article className="h-screen p-5">
                <ul className="relative h-full w-full">
                  {timeline.images.map((img, idx) => (
                    <li
                      key={`${img.src}_${idx}`}
                      className={`absolute ${img.position} ${img.width} overflow-hidden rounded-lg`}
                    >
                      <div className={`relative size-full ${img.aspectRatio}`}>
                        <img
                          className="object-cover w-full h-full rounded-lg shadow-xl"
                          src={img.src}
                          style={{
                            border: "4px solid white",
                          }}
                          alt=""
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>

        <div className="absolute top-0 left-0 -z-10 h-full w-full opacity-40">
          <div
            data-timeline="years-wrapper"
            className="text-year sticky top-0 left-0 flex min-h-screen w-full items-center justify-around"
            style={{ fontSize: "140px" }}
          >
            {years.map((year, idx) => (
              <div
                key={idx}
                data-timeline="year"
                className={`absolute top-1/2 left-0 flex w-full -translate-y-1/2 items-center justify-center leading-none ${Number.isNaN(+year) ? "text-orange" : "text-blue"}`}
                style={{ clipPath: "inset(12% 0px 12% 0px)" }}
              >
                {year.split("").map((char, charIdx) => (
                  <span
                    key={charIdx}
                    className={`char ${idx !== 0 ? "invisible" : ""}`}
                  >
                    {char}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function getYears() {
  return TIMELINES.map((timeline) => timeline.year);
}

export default Timeline;
