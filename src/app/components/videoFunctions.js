export const handleTimeUpdate = (videoRef, setCurrentTime) => {
    setCurrentTime(videoRef.current.currentTime);
};

export const handleDurationChange = (videoRef, setDuration) => {
    setDuration(videoRef.current.duration);
};

export const handlePlayPause = (videoRef, setIsPlaying) => {
    if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true)
    } else {
        videoRef.current.pause();
        setIsPlaying(false)
    }
};

export const handleFastForward = (videoRef) => {
    videoRef.current.currentTime += 10;
};

export const handleBacktrack = (videoRef) => {
    videoRef.current.currentTime -= 10;
};