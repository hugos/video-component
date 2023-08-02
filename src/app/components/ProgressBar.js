import React, { useState, useRef, useEffect } from "react";
import styles from "./progressbar.module.css";

const ProgressBar = ({ currentTime, duration, onSeek }) => {
  const [isUserSeeking, setIsUserSeeking] = useState(false);
  const progressBarRef = useRef(null);
  const handleRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isUserSeeking) {
        const progressBarRect = progressBarRef.current.getBoundingClientRect();
        const seekTime =
          ((e.clientX - progressBarRect.left) / progressBarRect.width) *
          duration;
        onSeek(seekTime);
      }
    };

    const handleMouseUp = () => {
      setIsUserSeeking(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isUserSeeking, duration, onSeek]);

  const progress = (currentTime / duration) * 100;
  const handleSize = 14; // Set the size of the handle (circle)

  const handleMouseDown = () => {
    setIsUserSeeking(true);
  };

  const handleStyle = {
    left: `${progress}%`,
    marginLeft: `-${handleSize / 2}px`,
    top: "50%",
    width: `${handleSize}px`,
    height: `${handleSize}px`,
    borderRadius: `${handleSize / 2}px`,
    transform: isUserSeeking
      ? "scale(1.5) translate(-50%, -50%)"
      : "translate(-50%, -50%)",
  };

  return (
    <div
      className={`${styles.progressBarContainer} progress is-black`}
      onMouseDown={handleMouseDown}
      ref={progressBarRef}
    >
      <div className={`${styles.progressBarTrack} progress-bar is-black`}>
        <div
          className={`${styles.progressBarCurrent} progress-bar is-black`}
          style={{ width: `${progress}%` }}
        />
        <div
          className={`${styles.progressBarHandle} progress-bar`}
          style={handleStyle}
          ref={handleRef}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
