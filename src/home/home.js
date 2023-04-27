import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import WordCloud from '../common/wordcloud.js';
import Generator from '../common/generator.js';
//import Memes from '../common/memes.js';
import './home.css';

function Posts({ postList, getPost, hiddenWords, hidePost, currentPost, isPostVisible }) {
  
  const [visiblePosts, setVisiblePosts] = useState([]);

  useEffect(() => {

    console.log("hiddenWords changed to: ", hiddenWords)

    if (hiddenWords.length > 0) {

      const filteredPosts = postList.filter(post => {

        for (let hw of hiddenWords) {

          if (!post.keywords.some(keyword => keyword.text === hw)) {
            return false
          }

        }

        return true;

      });

      console.log("filteredPosts", filteredPosts);
      setVisiblePosts(filteredPosts);

    } else {

      console.log("filteredPosts", postList);
      setVisiblePosts(() => [...postList]);

    }

  }, [hiddenWords, postList]);

  return (
    <>
      <div id="totalPosts">{visiblePosts.length} posts..</div>
      <div id="postsw">
        <Stack id="posts">
          {postList.map((post) => (
            <div
              key={post.id}
              className={`post ${isPostVisible && currentPost.id === post.id ? 'selected' : ''} ${visiblePosts.includes(post) ? '' : 'hidden'}`}
            >
              <div className="postTimeLineIcon">{post.date}</div>
              <button className="postButton" onClick={() => getPost(post.id)}>
                <div className="postTitle">
                  {post.title}
                 {/* <div className="postDate">{post.date}</div>*/}
                </div>
                <WordCloud
                  className="postWC"
                  height={200}
                  maxWidth={800}
                  words={post.keywords}
                  maxFontSize={35} />
              </button>
            </div>
          ))}
        </Stack>
      </div>

      {isPostVisible && (
        <div id="post-container">
          <Button onClick={() => hidePost()}>Hide Post</Button>
          <div className="postCWC">
              <WordCloud
                words={currentPost.keywords}
                height={200}
                maxWidth={800}
                maxFontSize={30} />
          </div>
          
          <div className="cpostContent">
              <div className="cpostDate">
                  {currentPost.date}
              </div>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {currentPost.content}
              </ReactMarkdown>
              <div className="empty"></div>
          </div>
        </div>
      )}
    </>
  );
}

function getSortedKeywords(posts) {
  const keywordMap = posts.reduce((map, post) => {
    post.keywords.forEach(keyword => {
      const existingKeyword = map[keyword.text];
      if (existingKeyword) {
        existingKeyword.weight += keyword.weight;
      } else {
        map[keyword.text] = { text: keyword.text, weight: keyword.weight };
      }
    });
    return map;
  }, {});

  const sortedKeywords = Object.values(keywordMap).sort((a, b) => b.weight - a.weight);

  return sortedKeywords;
}


export default function Home() {
  const [postList, setPostList] = useState([]);
  const [hiddenWords, setHiddenWords] = useState([]);
  const [currentPost, setCurrentPost] = useState({});
  const [isPostVisible, setIsPostVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  async function initPosts() {
    const resp = await fetch('/posts.json');
    const data = await resp.json();
    setPostList(data);
    console.log("gotton posts", data);
  }

  const getPost = useCallback(async (postId) => {
    // Only execute if the postList state is not empty
    if (postList.length > 0) {
      const response = await fetch(`/originals/${postId}.md`);
      const data = await response.text();
  
      const selectedPost = postList.find((post) => post.id === postId);
      if (selectedPost) {
        setCurrentPost({
          ...selectedPost,
          content: data,
        });
        setIsPostVisible(true);
  
        // Add the post ID to the URL using the navigate function
        navigate(`?postId=${postId}`, { replace: true });
      }
    }
  }, [postList, navigate]);


  useEffect(() => {
    if (postList.length === 0) {
      initPosts();
    }

  }, [location.search, postList]);

  useEffect(() => {
    const postId = new URLSearchParams(window.location.search).get('postId');
    if (postId) {
      getPost(parseInt(postId));
    }
  }, [getPost]);


  const hidePost = () => {
    setCurrentPost({});
    setIsPostVisible(false);

    // Remove all URL parameters using the navigate function
    navigate('', { replace: true });
  };

  const handleWordClick = (word) => {
    setHiddenWords((hiddenWords) => {
      const index = hiddenWords.indexOf(word);
      if (index === -1) {
        return [...hiddenWords, word];
      } else {
        return [...hiddenWords.slice(0, index), ...hiddenWords.slice(index + 1)];
      }
    });
  };

  return (
    <>
      <Generator />
      <div className="main">
        <div id="about">
          <WordCloud
            words={getSortedKeywords(postList)}
            clickable={true}
            maxWidth={1000}
            height={400}
            handleWordClick={handleWordClick}
          />
        </div>
        <Posts
          postList={postList}
          hiddenWords={hiddenWords}
          getPost={getPost}
          hidePost={hidePost}
          currentPost={currentPost}
          isPostVisible={isPostVisible}
        />
        <div className="empty"></div>
        {/*<Memes />*/}
      </div>
    </>
  );
}