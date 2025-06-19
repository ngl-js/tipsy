import {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useContext,
  useImperativeHandle,
} from "react";
import { formatTime } from "../utils/utils";
// Icons
import { FaRegPlayCircle } from "react-icons/fa";
import { FaRegPauseCircle } from "react-icons/fa";
// Context
import { MediaContext } from "../context/MediaContext";

const AudioPlayer = forwardRef(({ src, endTime, onPlay }, ref) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const { setSelectedAudio } = useContext(MediaContext);

  // Calculate remaining time for the tiny progress bar
  const remainingTime = endTime
    ? Math.max(0, startTime + endTime - currentTime)
    : Math.max(0, duration - currentTime);
  const totalEndTime = endTime || duration;
  const remainingPercentage =
    totalEndTime < 100 ? Math.round((remainingTime / totalEndTime) * 100) : 0;

  // Expose pause method to parent
  useImperativeHandle(ref, () => ({
    pause: () => {
      audioRef.current.pause();
      setIsPlaying(false);
    },
  }));

  useEffect(() => {
    const audio = audioRef.current;

    // Set duration when metadata is loaded
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    // Update current time during playback
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.currentTime >= startTime + endTime) {
        audio.pause();
        setIsPlaying(false);
        audio.currentTime = startTime;
      }
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [startTime, endTime]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      // pauseAllAudio();
      audio.currentTime = startTime; // Ensure playback starts at startTime
      audio.play();
      onPlay?.();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    if (!isPlaying) {
      // When paused, update startTime and audio position
      setStartTime(newTime);
      setSelectedAudio((prevAudio) => {
        return {
          ...prevAudio,
          start: newTime,
        };
      });
      audioRef.current.currentTime = newTime;
    }
    // When playing, update currentTime and audio position (scrubbing)
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  return (
    <div className="px-2">
      <div className="col-auto flex">
        <audio ref={audioRef} src={src} />
        <button onClick={togglePlay}>
          {isPlaying ? (
            <FaRegPauseCircle
              className="mr-2 mt-2 text-red-500"
              size={"1.3rem"}
            />
          ) : (
            <FaRegPlayCircle
              className="mr-2 mt-2 text-green-500"
              size={"1.3rem"}
            />
          )}
        </button>
        <label className="text-center text-gray-600 self-center pt-2">
          Tiempo: {formatTime(currentTime)} / {formatTime(duration)}
        </label>
      </div>
      <div className="mt-1">
        <input
          className="w-11/12 h-2 py-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:accent-amber-600"
          type="range"
          min="0"
          max={duration}
          step="0.1"
          value={isPlaying ? currentTime : startTime}
          onChange={handleProgressChange}
        />
        <div className="w-11/12 bg-gray-200 rounded-full h-1 dark:bg-gray-200 mt-0.5">
          <div
            className="bg-amber-400 h-1 rounded-full"
            style={{ width: `${remainingPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
});

export default AudioPlayer;
