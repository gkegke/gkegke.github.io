
import { useState, useRef } from 'react';

import './memes.css';

const Memes = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const scrollRef = useRef(null);

  const handleImgClick = (e) => {
    setSelectedImg(e.target.src);
  };

  const handleScrollRight = () => {
    scrollRef.current.scrollLeft += 200;
  };

  const memes = [];
  for (let i = 1; i <= 5; i++) {
    memes.push(
      <img
        key={i}
        src={`./memes/${i}-200x200.jpg`}
        alt="meme"
        width={200}
        height={200}
        style={{ cursor: 'pointer', borderRadius: '5px' }}
        onClick={handleImgClick}
      />
    );
  }

  return (
    <div id="memes-wrapper">
      <div id="memes">
        <div className="scroll-container" ref={scrollRef}>
          {memes}
        </div>
        <div className="scroll-buttons-right">
          <button onClick={handleScrollRight}>{'➡️'}</button>
        </div>
        {selectedImg && (
          <div className="modal">
            <img
              src={selectedImg}
              alt="meme"
              className="modal-image"
              onClick={() => setSelectedImg(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Memes;
