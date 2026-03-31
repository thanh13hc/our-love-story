import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import Lenis from "lenis";

import { Home } from "./pages";

import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";

// ScrollTrigger.config({
//   ignoreMobileResize: true,
// });

gsap.registerPlugin(ScrollTrigger, SplitText);

if (typeof window !== "undefined" && history.scrollRestoration) {
  history.scrollRestoration = "manual";
}

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.2,
    });

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.off("scroll", onScroll);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen h-full w-full flex justify-center">
      <Router>
        <Routes>
          {/* <Route path="/gsapto" element={<GsapTo />} />
          <Route path="/gsapfrom" element={<GsapFrom />} />
          <Route path="/gsapfromto" element={<GsapFromTo />} />
          <Route path="/gsaptimeline" element={<GsapTimeline />} />
          <Route path="/gsapstagger" element={<GsapStagger />} />
          <Route path="/gsapscrolltrigger" element={<GsapScrollTrigger />} />
          <Route path="/gsaptext" element={<GsapText />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate path="/" replace />} />
          {/* <Route path="/playground" element={<PlayGround />} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
