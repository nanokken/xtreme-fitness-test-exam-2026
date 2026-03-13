import { useRef, useState } from "react";
import aboutVideo from "../assets/video/aboutVideo.mp4";
import videoThumb from "../assets/video/video_img.jpg";

const stats = [
  { value: "600+",  label: "ARBEJDSTIMER" },
  { value: "790+",  label: "PROGRAMMER" },
  { value: "2560+", label: "GLADE KUNDER" },
  { value: "2560+", label: "SUNDERE KROPPE" },
];

export default function AboutUsVideo() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    videoRef.current?.play();
  };

  return (
    <section className="pb-20">
      {/* Stats row */}
      <div className="bg-gradient-brand pt-20 pb-60 px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 max-w-5xl mx-auto text-center text-white">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-5xl md:text-6xl font-black font-heading leading-none">
                {stat.value}
              </p>
              <p className="text-[0.65rem] md:text-xs tracking-[0.2em] font-semibold mt-2 uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Video */}
      <div className="bg-white pb-10 px-6 flex justify-center">
        <div className="relative w-full max-w-2xl rounded-xl  shadow-xl">
          <video
            ref={videoRef}
            className="w-full block -mt-50 z-50"
            src={aboutVideo}
            poster={videoThumb}
            controls={playing}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
          {!playing && (
            <button
              onClick={handlePlay}
              aria-label="Afspil video"
              className="absolute inset-0 flex items-center justify-center -mt-50"
            >
              <span className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-primary ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
