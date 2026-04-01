import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const today = new Date();

const dateSplit = today.toDateString().split(" ");

const dateStr = `${dateSplit[0]}, ${dateSplit.slice(1, 3).join(" ")}`;
603363;
let retry = 0;
function Summary() {
  const containerRef = useRef();
  const videoRef = useRef();
  useGSAP(
    () => {
      const video = videoRef.current;

      function pauseVideo() {
        video.pause();
        video.currentTime = 0;
      }

      function playVideo() {
        video
          .play()
          .then(() => {
            setTimeout(() => {
              video.muted = false;
            }, 1000);
          })
          .catch(() => {
            pauseVideo();
            if (retry <= 10) {
              retry++;

              setTimeout(() => {
                playVideo();
              }, 500);
            }
          });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (self.progress > 0.9 && video.paused) {
              playVideo();
            }

            if (self.progress < 0.9 && !video.paused) {
              pauseVideo();
              retry = 0;
            }
          },
        },
      });

      tl.fromTo(
        ".message",
        {
          opacity: 0,
          xPercent: 100,
        },
        {
          opacity: 1,
          xPercent: 0,
          stagger: 2,
          ease: "power4.in",
          duration: 8,
        },
      )
        .to(
          ".scale-up",
          {
            scale: 1.65,
            ease: "power3.in",
            duration: 4,
          },
          "scale",
        )
        .to(".fade-down", {
          opacity: 0,
          stagger: 2,
          duration: 8,
          ease: "power3.out",
        })
        .to(
          "video",
          {
            scale: 0.65,
            filter: "brightness(1)",
            ease: "power4.inOut",
            duration: 6,
          },
          "scale",
        );
    },
    { scope: containerRef },
  );

  return (
    <section
      id="secret"
      ref={containerRef}
      className="w-full h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="scale-up w-full h-auto flex items-center relative">
        <video
          ref={videoRef}
          playsInline
          muted
          className="absolute top-0 left-0 w-full h-full object-contain brightness-75"
          style={{ scale: 0.9 }}
          poster="/img/final_poster.png"
          preload="auto"
        >
          <source src="/img/summary_video_2.mp4"></source>
        </video>
        <div className="absolute flex flex-col items-center w-full h-full px-[20%] py-[30%]">
          <h2 className="fade-down text-center text-2xl font-sans text-white opacity-80 drop-shadow-lg">
            {dateStr}
          </h2>
          <h1 className="fade-down text-[5.75rem] font-bold font-sans text-white -mt-5 opacity-90 drop-shadow-lg">{`${today.getHours().toString().padStart(2, "0")}:${today.getMinutes().toString().padStart(2, "0")}`}</h1>

          <div className="flex gap-1 flex-col items-center">
            <img
              src="/img/summary_notification_1.svg"
              className="message fade-down w-full h-auto"
              alt=""
            />
            <img
              src="/img/summary_notification_2.svg"
              className="message fade-down w-full h-auto"
              alt=""
            />
            <img
              src="/img/summary_notification_3.svg"
              className="message fade-down w-full h-auto"
              alt=""
            />
          </div>
        </div>
        <img
          src="/img/phone.png"
          className="fade-down w-full h-auto z-10"
          alt=""
        />
      </div>
    </section>
  );
}

export default Summary;
