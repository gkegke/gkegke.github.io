import React, { useState, useEffect } from "react";

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
    const _colors = ["#ff0000", "#ffff00", "#088395","#0080ff", "#8dc2f7"];
    const result = [];
    const windowWidth = window.innerWidth;
    const n = Math.floor(windowWidth/4);
  
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
  }

  useEffect(() => {
    let requestId = null;
    const animate = () => {
      generate();
      setTimeout(() => {
        requestId = requestAnimationFrame(animate);
      }, 500);
    };
    animate();
  
    return () => {
      cancelAnimationFrame(requestId);
    };
  }, []);


  return (
    <div id="display">
      <div id="logo"><span>gkegke</span> <small>just some random thoughts</small></div>
      <div className="generated">
        {generated.map((item, index) => (
        <span key={index} style={{ color: item.props.style.color }}>
          {item.props.children}
        </span>
        ))}
      </div>
    </div>
  );
}
