import "./wordcloud.css";

import { useState, useEffect, useCallback } from 'react';

const Button = ({ style, text, handleWordClick }) => {

  const [selected, setSelected] = useState(false);

  const handleClick = () => {

    setSelected((prev) => !prev);

    handleWordClick(text);

  }

  const className = `clickable ${selected ? 'clicked' : ''}`;

  return (
    <div className={className} style={style} onClick={handleClick}>
      {text}
    </div>
  );
};

const WordCloud = ({ words, height, maxWidth, showPercentage=80, maxFontSize=48, clickable=false, handleWordClick=null }) => {

  const [randomTops, setRandomTops] = useState([]);
  const [randomRights, setRandomRights] = useState([]);
  const [currentMaxFontSize, setCurrentMaxFontSize] = useState(maxFontSize);
  const [previousWindowWidth, setPreviousWindowWidth] = useState(window.innerWidth);

  const handleResize = useCallback(() => {
    const windowWidth = Math.min(window.innerWidth, maxWidth);
    const windowWidthDiff = Math.abs(windowWidth - previousWindowWidth);
  
    if (windowWidthDiff < 25 || windowWidth === previousWindowWidth) {
      return;
    }
  
    let newMaxFontSize = maxFontSize;
  
    if (windowWidth < 400) {
      newMaxFontSize = 25;
    } else if (windowWidth < 500) {
      newMaxFontSize = 30;
    }
  
    setCurrentMaxFontSize(newMaxFontSize);
    setRandomTops([]);
  
    console.log(`
      ww: ${windowWidth}
    `);
  
    setPreviousWindowWidth(windowWidth);
  }, [maxWidth, previousWindowWidth, maxFontSize]);

  useEffect(() => {

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [height, handleResize]);

  useEffect(() => {
    if (randomTops.length === 0) {

      let windowWidth = Math.min(window.innerWidth, maxWidth);

      if (window.innerWidth <= 400) {
        windowWidth = 200;
      }

      setRandomTops(words.map(() => Math.random() * height));
      setRandomRights(words.map(() => (Math.random() * windowWidth) - 10));
    }
  }, [words, randomTops.length, height, maxWidth]);
  
  const listItemStyle = (wordIndex) => {
    const minSize = 16;
    const maxSize = currentMaxFontSize;
    const sizeRange = maxSize - minSize;
    const sizes = words.map(({ weight }) => parseFloat(weight));
    const sizeRatio = (sizes[wordIndex] - Math.min(...sizes)) / (Math.max(...sizes) - Math.min(...sizes));
    const fontSize = Math.round(minSize + sizeRatio * sizeRange);
    return {
      fontFamily: 'Arial',
      fontSize: `${fontSize}px`,
      position: 'absolute',
      top: `${randomTops[wordIndex]}px`,
      right: `${randomRights[wordIndex]}px`,
    };
  };

  return (
    <center>
      <div className="wordcloud" style={{height: height}}>
        {
          words.map(({ text }, index) => (
              clickable ? <Button
                            key={index}
                            style={listItemStyle(index)}
                            text={text}
                            handleWordClick={handleWordClick}/>
                        : <div key={index} style={listItemStyle(index)}>{text}</div>
          ))
        }
      </div>
    </center>
  );
};

export default WordCloud;