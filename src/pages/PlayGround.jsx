import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import confetti from "canvas-confetti";
import Lenis from "lenis";
import {
  Heart,
  Stars,
  Calendar,
  MapPin,
  Music,
  Volume2,
  VolumeX,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ProposalWebsite = () => {
  const containerRef = useRef();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  // 1. Khởi tạo Smooth Scroll (Lenis) cho cảm giác mượt mà
  useEffect(() => {
    // const lenis = new Lenis();
    // function raf(time) {
    //   lenis.raf(time);
    //   requestAnimationFrame(raf);
    // }
    // requestAnimationFrame(raf);
    // return () => lenis.destroy();
  }, []);

  // 2. Toàn bộ Animation Logic
  useGSAP(
    () => {
      if (!started) return;

      // Reveal các phần văn bản khi scroll
      const reveals = gsap.utils.toArray(".reveal");
      reveals.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
            },
          },
        );
      });

      // Horizontal Scroll Gallery
      const gallery = document.querySelector(".gallery-wrapper");
      gsap.to(gallery, {
        x: () => -(gallery.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: ".gallery-section",
          start: "top top",
          end: () => `+=${gallery.scrollWidth}`,
          scrub: 1,
          pin: true,
        },
      });

      // Parallax cho các ảnh nền
      gsap.utils.toArray(".parallax").forEach((img) => {
        gsap.to(img, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            scrub: true,
          },
        });
      });
    },
    { scope: containerRef, dependencies: [started] },
  );

  // 3. Handlers
  const startJourney = () => {
    setStarted(true);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch((e) => console.log("Audio play blocked"));
    }
    // Scroll xuống nhẹ nhàng sau khi nhấn start
    setTimeout(() => {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }, 100);
  };

  const toggleMusic = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleYes = () => {
    const scalar = 2;
    const heart = confetti.shapeFromText({ text: "❤️", scalar });

    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0.5,
      decay: 0.94,
      startVelocity: 30,
      shapes: [heart],
      scalar,
    };

    const shoot = () => {
      confetti({ ...defaults, particleCount: 40, origin: { x: 0.2, y: 0.5 } });
      confetti({ ...defaults, particleCount: 40, origin: { x: 0.8, y: 0.5 } });
    };

    setTimeout(shoot, 0);
    setTimeout(shoot, 1000);
    setTimeout(shoot, 2000);
  };

  const moveNoButton = (e) => {
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 100);
    gsap.to(e.target, {
      position: "fixed",
      left: x,
      top: y,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  };

  return (
    <div
      ref={containerRef}
      className="selection:bg-rose-200 selection:text-rose-900"
    >
      {/* Audio Element - Thay URL nhạc của bạn vào đây */}
      <audio
        ref={audioRef}
        loop
        src="https://www.bensound.com/bensound-music/bensound-love.mp3"
      />

      {/* Nút điều khiển nhạc */}
      {started && (
        <button
          onClick={toggleMusic}
          className="fixed top-6 right-6 z-50 p-3 bg-white/50 backdrop-blur-md rounded-full shadow-lg"
        >
          {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      )}

      {/* 1. MÀN HÌNH CHỜ (INTRO) */}
      {!started ? (
        <section className="h-screen w-full flex flex-col items-center justify-center bg-stone-50 z-[100] relative">
          <div className="text-center space-y-6">
            <Heart
              className="mx-auto text-rose-400 animate-pulse"
              size={60}
              fill="currentColor"
            />
            <h1 className="text-3xl font-serif italic text-stone-700">
              A special message for [Tên Bạn Gái]
            </h1>
            <button
              onClick={startJourney}
              className="px-10 py-4 bg-stone-800 text-stone-50 rounded-full hover:bg-rose-500 transition-colors duration-500"
            >
              Open the story
            </button>
          </div>
        </section>
      ) : (
        <>
          {/* 2. FIRST MET */}
          <section className="h-screen relative overflow-hidden flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=2000"
              className="parallax absolute inset-0 w-full h-[140%] object-cover opacity-60"
              alt="First meet"
            />
            <div className="reveal z-10 text-center bg-white/30 backdrop-blur-sm p-12 rounded-2xl border border-white/50">
              <Calendar className="mx-auto mb-4 text-rose-600" />
              <h2 className="text-5xl font-serif mb-4">Ngày ấy...</h2>
              <p className="text-lg italic tracking-wide">
                "Lần đầu tiên anh thấy em, cả thế giới như ngừng lại."
              </p>
              <p className="text-sm mt-4 text-stone-500 uppercase tracking-widest">
                Hà Nội, 20.10.2023
              </p>
            </div>
          </section>

          {/* 3. HORIZONTAL GALLERY */}
          <section className="gallery-section h-screen bg-stone-900 text-stone-100">
            <div className="gallery-wrapper flex items-center h-full px-[10vw] space-x-20">
              <div className="flex-shrink-0 w-[400px]">
                <h2 className="text-6xl font-serif leading-tight">
                  Những
                  <br />
                  mảnh ghép
                  <br />
                  kỷ niệm
                </h2>
                <p className="mt-6 text-stone-400 italic">
                  Mỗi bức ảnh là một lý do anh yêu em nhiều hơn.
                </p>
              </div>
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[400px] h-[550px] relative group overflow-hidden rounded-xl"
                >
                  <img
                    src={`https://picsum.photos/seed/${i + 50}/800/1200`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Gallery"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <p className="text-white italic">
                      Kỷ niệm #0{i} - Nơi tình yêu bắt đầu
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. PROPOSAL SECTION */}
          <section className="min-h-screen flex flex-col items-center justify-center bg-rose-50 px-6 py-20">
            <div className="reveal text-center max-w-2xl">
              <Stars className="mx-auto text-amber-400 mb-8" size={48} />
              <h2 className="text-5xl md:text-7xl font-serif text-rose-800 mb-8 leading-tight">
                Em có đồng ý cùng anh xây dựng một gia đình không?
              </h2>

              <div className="flex flex-col sm:flex-row gap-8 items-center justify-center mt-12">
                <button
                  onClick={handleYes}
                  className="group relative px-16 py-5 bg-rose-500 text-white rounded-full text-2xl font-bold overflow-hidden shadow-[0_20px_50px_rgba(244,63,94,0.3)] transition-all hover:scale-110 active:scale-95"
                >
                  <span className="relative z-10">ĐỒNG Ý ❤️</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                </button>

                <button
                  onMouseEnter={moveNoButton}
                  onClick={moveNoButton}
                  className="px-10 py-4 border-2 border-rose-300 text-rose-400 rounded-full italic text-lg bg-white"
                >
                  Để em suy nghĩ... 🙃
                </button>
              </div>
            </div>

            <footer className="mt-32 text-stone-400 font-light tracking-[0.2em] uppercase text-xs">
              Forever & Always • [Tên của bạn]
            </footer>
          </section>
        </>
      )}
    </div>
  );
};

export default ProposalWebsite;
