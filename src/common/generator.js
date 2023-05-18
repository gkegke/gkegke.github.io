import React, { useState, useEffect } from "react";
import { Space, Button } from 'antd';

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
  const [generated, setGenerated] = useState([]);
  const [lastGenerated, setLastGenerated] = useState(null);

  /**
   * Generates a random string of characters based on a
   * given probability distribution.
   * 
   * Uses bisectLeft to check which interval the random variable
   * x is within to select the approriate new char to add to final
   * result string.
   *
   * @function generate
   *
   * @returns {string} 
  */
  function generate() {
    const _char_thresholds = [0.005, 0.3, 0.4, 0.5, 1];
    const _chars = ["♪", "、", "ヽ", "｀", " "];
    const _color_thresholds = [0.05, 0.15, 0.3, 0.5, 1];
    //const _colors = ["#ff0000", "#ffff00", "#088395","#0080ff", "#8dc2f7"];
    const _colors = ["#ff0000", "#ffff00", "#088395","#0080ff", "#e1e1e1"];
    const result = [];
    const windowWidth = window.innerWidth;
    const n = Math.floor(windowWidth);
  
    for (let i = 0; i < n; i++) {

      const x = Math.random();
      const y = Math.random();
      const oindex = bisectLeft(_char_thresholds, x);
      const cindex = bisectLeft(_color_thresholds, y);

      const s = _chars[oindex];
      const c = _colors[cindex];

      result.push(
        <span key={i} style={{ color: c }}>
          {s}
        </span>
      );
    }
  
    setGenerated(result);
    setLastGenerated(Date.now());
  }

  useEffect(() => {
    let requestId = null;
    
    const animate = () => {

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

      // Set a timeout for 2000 milliseconds before requesting the next animation frame
      setTimeout(() => {
        requestId = requestAnimationFrame(animate);
      }, 500);
    };

    animate();
  
    return () => {
      cancelAnimationFrame(requestId);
    };
  }, []);


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
        <a href="https://github.com/gkegke">github</a>
      </Space>
      <div className="generated">
        {generated.map((item, index) => (
        <span key={index} style={{ color: item.props.style.color }}>
          {item.props.children}
        </span>
        ))}
      </div>
    </div>
  </>);
}
