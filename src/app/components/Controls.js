import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';

const Controls = ({ isPlaying, onPlayPause, onFastForward, onBacktrack }) => {
  return (
    <div className="buttons is-centered" style={{ marginTop: '10px' }}>
      <button className="button is-black" onClick={onBacktrack}>
        <FontAwesomeIcon icon={faBackward} />
      </button>
      {isPlaying ? (
        <button className="button is-black" onClick={() => onPlayPause(false)}>
          <FontAwesomeIcon icon={faPause} />
        </button>
      ) : (
        <button className="button is-black" onClick={() => onPlayPause(true)}>
          <FontAwesomeIcon icon={faPlay} />
        </button>
      )}
      <button className="button is-black" onClick={onFastForward}>
        <FontAwesomeIcon icon={faForward} />
      </button>
    </div>
  );
};

export default Controls;