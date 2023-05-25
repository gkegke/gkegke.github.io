import React, { useRef, useState, useEffect, useCallback } from "react";
import { Space } from 'antd';

import "./generator.css";

function bisectLeft(arr, value, lo = 0, hi = arr.length) {
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] < value) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }
  return lo;
}

export default function Generator() {
  const canvas = useRef();
  const [context, setContext] = useState(null);
  const [lastGenerated, setLastGenerated] = useState(null);
  const [previousWindowWidth, setPreviousWindowWidth] = useState(window.innerWidth);

const generate = useCallback(() => {
  const _char_thresholds = [0.005, 0.3, 0.4, 0.5, 1];
  const _chars = ["♪", "、", "ヽ", "｀", " "];
  const _color_thresholds = [0.05, 0.15, 0.3, 0.5, 1];
  const _colors = ["#ff0000", "#ffff00", "#088395", "#0080ff", "#e1e1e1"];

  // clear the previous content
  context.clearRect(0, 0, window.innerWidth*3, window.innerHeight*3);

  const n = window.innerWidth * 20; // adjust the number of characters based on font size
  const lineHeight = 50; // adjust the desired line height

  let currentX = 0;
  let currentY = 0;

  for (let i = 0; i < n; i++) {
    const x = Math.random();
    const y = Math.random();
    const oindex = bisectLeft(_char_thresholds, x);
    const cindex = bisectLeft(_color_thresholds, y);

    const s = _chars[oindex];
    const c = _colors[cindex];

    // draw the text on the canvas
    context.font = "30px Verdana"; // adjust the font size and family
    context.fillStyle = c;
    context.fillText(s, currentX, currentY); // adjust the position and alignment

    currentX += 20; // increment the x-coordinate by the character width

    // check if the x-coordinate exceeds the window width
    if (currentX + 20 > window.innerWidth) {
      currentX = 0; // reset x-coordinate to the beginning of the line
      currentY += lineHeight; // move to the next line
    }
  }
}, [context]);

  useEffect(() => {
    const canvasEle = canvas.current;
    if (canvasEle) {
      const ctx = canvasEle.getContext("2d");
      canvasEle.width = window.innerWidth;
      canvasEle.height = 450;
      if (ctx) {
        setContext(ctx);
      } else {
        console.error("Failed to get context.");
      }
    }
  }, [canvas]);

  const handleResize = useCallback(() => {
    const windowWidth = window.innerWidth;
    const windowWidthDiff = Math.abs(windowWidth - previousWindowWidth);
  
    if (windowWidthDiff < 25 || windowWidth === previousWindowWidth) {
      return;
    }
  
    const canvasEle = canvas.current;
    if (canvasEle) {
      canvasEle.width = window.innerWidth;
      canvasEle.height = 450;
    }

    generate();

  }, [previousWindowWidth, generate]);

  useEffect(() => {

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  useEffect(() => {
    let requestId = null;
    
    const animate = () => {

      if (context !== null) {
  
        // Check the difference between the current time and the lastGenerated time
        let diff = Date.now() - lastGenerated;
  
        // If the difference is greater than or equal to 2000 milliseconds, call generate
        if (lastGenerated === null || diff >= 2000) {
          generate();
        } else {
          console.log(`
            request ID: ${requestId}
            lastGenerated: ${lastGenerated}
            diff: ${diff}
          `);
        }

      }

      // Set a timeout for 2000 milliseconds before requesting the next animation frame
      setTimeout(() => {
        requestId = requestAnimationFrame(animate);
      }, 750);
    };

    animate();
  
    return () => {
      cancelAnimationFrame(requestId);
    };
  }, [context, generate, lastGenerated]); // add context as a dependency


  return (<>
    <div id="display">
      <Space
        id="logow"
      >
        <div className="logo">
          <b>__</b> gkegke
        </div>
        <span className="random">
          just some random thoughts
        </span>
        <span className="random2">
          thoughts
        </span>
        <a className="github" href="https://github.com/gkegke">github</a>
      </Space>
      <canvas id="generated" ref={canvas} /> {/* use canvas instead of div */}
    </div>
  </>);
}
