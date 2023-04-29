
import { useState } from 'react';

import './memes.css';

const parsedFilename = (filename) => {
  const parts = filename.split("-");
  const name = parts[0] + ".jpg";
  return name;
}

const Memes = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImgClick = (e) => {
    setSelectedImg(parsedFilename(e.target.src));
  };

  const memes = [];
  for (let i = 1; i <= 2; i++) {
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
        <div className="scroll-container">
          {memes}
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
