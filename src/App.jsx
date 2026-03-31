import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  GsapFrom,
  GsapFromTo,
  GsapScrollTrigger,
  GsapStagger,
  GsapText,
  GsapTimeline,
  GsapTo,
  Home,
} from "./pages";
import PlayGround from "./pages/PlayGround";

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
          {/* <Route path="/playground" element={<PlayGround />} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
