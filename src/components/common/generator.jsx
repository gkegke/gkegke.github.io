import React, { useRef, useState, useEffect, useCallback } from "react";

import { Space, Tooltip } from 'antd';

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
  const generatorRef = useRef();
  const [context, setContext] = useState(null);
  const [lastGenerated, setLastGenerated] = useState(null);

const generate = useCallback(() => {
  if (!context) return;

  const _char_thresholds = [0.005, 0.3, 0.4, 0.5, 1];
  const _chars = ["♪", "、", "ヽ", "｀", " "];
  const _color_thresholds = [0.05, 0.15, 0.3, 0.5, 1];
  const _colors = ["#ffffff", "#ffff00", "#088395", "#0080ff", "#e1e1e1"];

  // clear the previous content
  context.clearRect(0, 0, canvas.current.width, canvas.current.height);
  console.log(canvas.current.width)

  const n = 20 * 20; // adjust the number of characters based on font size
  const lineHeight = 15; // adjust the desired line height

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
    context.font = "25px Verdana"; // adjust the font size and family
    context.fillStyle = c;
    context.fillText(s, currentX, currentY); // adjust the position and alignment

    currentX += 10; // increment the x-coordinate by the character width

      // check if the x-coordinate exceeds the canvas width
      if (currentX + 20 > canvas.current.width) {
      currentX = 0; // reset x-coordinate to the beginning of the line
      currentY += lineHeight; // move to the next line
    }
  }
}, [context]);

  useEffect(() => {
    const canvasEle = canvas.current;
    if (canvasEle) {
      const ctx = canvasEle.getContext("2d");
      canvasEle.width = canvasEle.width;
      canvasEle.height = canvasEle.height;
      if (ctx) {
        setContext(ctx);
      } else {
        console.error("Failed to get context.");
      }
    }
  }, []);

  useEffect(() => {
    let requestId = null;
    
    const animate = () => {

      if (context !== null) {
  
        generate();
        // Check the difference between the current time and the lastGenerated time
        //let diff = Date.now() - lastGenerated;
  
        // If the difference is greater than or equal to 2000 milliseconds, call generate
        //if (lastGenerated === null || diff >= 2000) {
        //} else {
        //  console.log(`
        //    request ID: ${requestId}
        //    lastGenerated: ${lastGenerated}
        //    diff: ${diff}
        //  `);
        //}

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
  
    useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 500;
      const generator = generatorRef.current;

      if (generator) {
        generator.style.minWidth = isMobile ? "200px" : "500px";
        generator.style.maxWidth = isMobile ? "200px" : "500px";
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize on mount

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (<>
    <div 
      id="generator"
      ref={generatorRef}
      className={`relative overflow-hidden`}
      style={{height:"390px", minWidth: "500px"}}
      >
      <canvas ref={canvas} 
        style={{height: "390px", width: "500px"}}
      /> 
     <Space
       className="absolute bottom-5 left-5 text-white justify-start items-start flex flex-col"
      >
        <div className="text-2xl font-bold">
          __ gkegke
        </div>
      </Space>
    </div>
  </>);
}
