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
  const [displayedWords, setDisplayedWords] = useState(words);
  const [currentMaxFontSize, setCurrentMaxFontSize] = useState(maxFontSize);
  const [previousWindowWidth, setPreviousWindowWidth] = useState(window.innerWidth);

  const handleResize = useCallback(() => {
    const windowWidth = Math.min(window.innerWidth, maxWidth);
    const windowWidthDiff = Math.abs(windowWidth - previousWindowWidth);
  
    if (windowWidthDiff < 25 || windowWidth === previousWindowWidth) {
      return;
    }
  
    let newMaxFontSize = maxFontSize;
    let newShowPercentage = showPercentage;
  
    if (windowWidth < 400) {
      newMaxFontSize = 25;
      newShowPercentage = 30;
    } else if (windowWidth < 500) {
      newMaxFontSize = 30;
      newShowPercentage = 50;
    }
  
    const dwords = words.slice(0, Math.floor((newShowPercentage/100) * words.length));

    setCurrentMaxFontSize(newMaxFontSize);
    setRandomTops([]);
  
    console.log(`
      ww: ${windowWidth}
      words length: ${words.length}
      newShowPercentage: ${newShowPercentage}
      slicen : ${Math.floor((newShowPercentage/100) * words.length)}
      wn: ${dwords.length}
    `);
  
    setDisplayedWords((prev) => dwords);
    setPreviousWindowWidth(windowWidth);
  }, [maxWidth, previousWindowWidth, maxFontSize, showPercentage]);

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
      display: 'inline-block',
      fontFamily: 'Arial',
      fontSize: `${fontSize}px`,
      position: 'absolute',
      top: `${randomTops[wordIndex]}px`,
      right: `${randomRights[wordIndex]}px`,
    };
  };

  //{/*words.slice(0, Math.floor((currentShowPercentage/100) * words.length)).map(({ text }, index) => (*/
  return (
    <center>
      <div className="wordcloud" style={{height: height}}>
        {
          displayedWords.map(({ text }, index) => (
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