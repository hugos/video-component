"use client";
import React, { useRef, useState, useEffect } from "react";
import Hls from "hls.js";
import ProgressBar from "./ProgressBar";
import { handlePlayPause, handleFastForward, handleBacktrack } from './videoFunctions';
import Controls from "./Controls";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Function to handle seeking in the video
  const handleSeek = (seekTime) => {
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const videoURL =
    "https://d3ukqbhrqb4xnt.cloudfront.net/share_videos/6e95f9a732a74664a4982adf4b808500/e8ffab99-e494-495d-8b21-787e95f9672d/211115200114.m3u8";

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoURL);
      hls.attachMedia(videoRef.current);

      // Handle video time updates
      videoRef.current.addEventListener("timeupdate", () => {
        setCurrentTime(videoRef.current.currentTime);
      });

      // Handle video duration change
      videoRef.current.addEventListener("loadedmetadata", () => {
        setDuration(videoRef.current.duration);
      });

      // Cleanup event listeners when the component unmounts
      return () => {
        hls.destroy();
        videoRef.current.removeEventListener("timeupdate", () => { });
        videoRef.current.removeEventListener("loadedmetadata", () => { });
      };
    } else {
      console.error("HLS not supported on this browser.");
    }
  }, []);

  return (
    <div>
      <video
        id="video-player"
        ref={videoRef}
        width="640"
        height="360"
        autoPlay={true}
      >
        <source src={videoURL} type="application/x-mpegURL" />
        Your browser does not support the video tag.
      </video>
      <ProgressBar
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek}
      />
      <Controls
        isPlaying={isPlaying}
        onPlayPause={() => handlePlayPause(videoRef, setIsPlaying)}
        onFastForward={() => handleFastForward(videoRef)}
        onBacktrack={() => handleBacktrack(videoRef)}
      />
      <div>
        <p>Current Time: {currentTime.toFixed(2)}</p>
        <p>Duration: {duration.toFixed(2)}</p>
        <p>Is Playing: {isPlaying ? "Yes" : "No"}</p>
      </div>
    </div>
  );
};

export default VideoPlayer;
