
import { useRef, useState, useEffect, useMemo } from 'react';

import { Space, Tooltip } from 'antd';

import {
  AudioMutedOutlined,
  AudioOutlined,
  GithubOutlined,
} from '@ant-design/icons';

import FadeInSection from '../common/fadeInSection.jsx';
import WordCloud from '../common/wordcloud.jsx';

export default function Posts({ postList, getPost, selectedPostId, togglePostButton }) {

  const containerRef = useRef(null);
  const [positions, setPositions] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const animationFrameRef = useRef(null);
  const lastUpdateTimeRef = useRef(Date.now());

  const years = useMemo(() => {
    // Extract unique years from post dates
    const yearsSet = new Set(postList.map(post => Number(post.date.split(" ").at(-1))));
    return Array.from(yearsSet).sort((a, b) => b - a); // Sort years descending
  }, [postList]);

  useEffect(() => {
    setSelectedYear(years.at(0))
  }, [postList, years])

  useEffect(() => {
    const container = containerRef.current;
    const containerWidth = container.offsetWidth * (3 / 4);
    const containerHeight = 200;

    const initialPositions = postList.map((_, index) => ({
      x: Math.random() * containerWidth,
      y: Math.random() * containerHeight,
      dx: Math.max((Math.random() - 0.5) * 4, 0.1),
      dy: Math.max((Math.random() - 0.5) * 4, 0.1),
    }));


    setPositions(initialPositions);

    animationFrameRef.current = requestAnimationFrame(updatePositions);

    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [postList]);

 const updatePositions = () => {
  const now = Date.now();
  const elapsed = (now - lastUpdateTimeRef.current) / 1000; // Convert to seconds

  if (elapsed >= 0.02) { // Ensure updates occur at reasonable intervals
    setPositions((prevPositions) =>
      prevPositions.map(({ x, y, dx, dy }) => {
        const containerWidth = containerRef.current.offsetWidth * 0.85;
        const containerHeight = 300;

        // Update positions using elapsed time for smooth motion
        let newX = x + dx * elapsed * 60; // Scale by elapsed and 60fps factor
        let newY = y + dy * elapsed * 60;

        // Reflect position when hitting boundaries
        if (newX < 0) {
          newX = 0;
          dx *= -1;
        }
        if (newX > containerWidth) {
          newX = containerWidth;
          dx *= -1;
        }
        if (newY < 0) {
          newY = 0;
          dy *= -1;
        }
        if (newY > containerHeight * 0.5) {
          newY = containerHeight * 0.5;
          dy *= -1;
        }

        // Ensure minimum velocity to prevent jitter
        dx = Math.sign(dx) * Math.max(Math.abs(dx), 0.1);
        dy = Math.sign(dy) * Math.max(Math.abs(dy), 0.1);

        return { x: newX, y: newY, dx, dy };
      })
    );
    lastUpdateTimeRef.current = now;
  }

  animationFrameRef.current = requestAnimationFrame(updatePositions);
}; 

  const filterPostsByYear = (year) => {
    setVisiblePosts(postList.filter(post => Number(post.date.split(" ").at(-1)) === year));
  };

  const listItemStyle = (index) => {
    const { x, y } = positions[index] || { x: 0, y: 0 };
    return {
      position: "absolute",
      top: `${y}px`,
      left: `${x}px`,
      minWidth: "175px",
      maxWidth: "175px",
      height: "300px",
    };
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: "450px" }}
    >
      <TopLeft />
      <div className="absolute top-20 left-2 flex gap-2">
       {years.map(year => (
          <button
            key={`year-${year}`}
            className={`text-white px-2 py-1 rounded hover:bg-gray-500 ${
              year === selectedYear ? 'bg-blue-500' : 'bg-gray-700 '
            }`}
            onClick={() => setSelectedYear(year)}
          >
            {year} ({postList.filter(post => Number(post.date.split(" ").at(-1)) === year).length})
          </button>
        ))}
      </div>
      {postList.filter(post => Number(post.date.split(" ").at(-1)) === selectedYear).map((post, i) => (
        <FadeInSection key={`post:${i}`}>
          <div style={listItemStyle(i)}>
            <PostButton
              post={post}
              getPost={() => getPost(post.id)}
              selected={post.id === selectedPostId}
              togglePostButton={togglePostButton}
            />
          </div>
        </FadeInSection>
      ))}
    </div>
  );
}

function TopLeft() {
  return (
    <div
      className="absolute top-4 left-2 text-white justify-start items-start flex flex-col"
      style={{zIndex: 9999}}
    >
      <div className="flex gap-2 items-center">
        <Tooltip title="checkout my github">
          <a href="https://github.com/gkegke" className="hover:bg-blue-500 p-2">
            <GithubOutlined className="text-white text-4xl" />
          </a>
        </Tooltip>
        <div className="text-nowrap text-2xl font-bold">
          __ gkegke
          <div className="text-sm text-wrap">just some random thoughts</div>
        </div>
      </div>
    </div>
  );
}

function PostButton({ post, selected, togglePostButton }) {
  const handleClick = () => {
    togglePostButton(post.id);
  };

  const memoizedWords = useMemo(() => post.keywords.slice(0, 10), [post.keywords]);

  return (
    <button
      className={`relative text-white ${selected ? '' : 'opacity-70'}`}
      style={{ minWidth: "175px", maxWidth: "175px", height: "300px" }}
      onClick={handleClick}
    >
      <div className="z-50 absolute left-2 bottom-2 text-white px-2 rounded items-center">
        <div className="ml-1 text-sm flex justify-center items-center">{post.date}</div>
        <div className="text-white rounded flex m-1 p-1 text-base font-bold">
          {post.title}
        </div>
      </div>
      <WordCloud words={memoizedWords} maxFontSize={25} />
    </button>
  );
}