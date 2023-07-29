import { useEffect, useState } from 'react'
import { useConfig } from '@/lib/config'
import TagItem from '@/components/TagItem'
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child } from "firebase/database";
import hackerNewsIcon from '../public/hackernews.png';


const HackerNews = ({ slug, customItemId }) => {
  const BLOG = useConfig();
  const [ hnPost, setHnPost ] = useState();

  var config = {
    databaseURL: "https://hacker-news.firebaseio.com",
  };

  const app = initializeApp(config);
  getDatabase(app);
  const dbRef = ref(getDatabase());

  useEffect(() => {
    async function loadPost(itemId) {
      const fetchedPost = await get(child(dbRef, `v0/item/${itemId}`));
      if (!fetchedPost.exists()) {
        return null;
      }

      return fetchedPost.val()
    }

    async function loadUserPost() {
      const user = await get(child(dbRef, `v0/user/${BLOG.hackerNewsUsername}`));
      if (!user.exists()) {
        console.log("User does not exist");
        return null;
      }

      const userData = user.val();
      const submittedPosts = userData.submitted;

      let foundPost = null;
      for (let index = 0; index < submittedPosts?.length; index++) {
        const submittedPostId = submittedPosts[index];
        const fetchedPost = loadPost(submittedPostId);
        if (!fetchedPost) {
          continue;
        }

        if (!fetchedPost.url) {
            continue;
        }

        if (!fetchedPost.url.startsWith(`${BLOG.link}/${slug}`)) {
            continue;
        }

        foundPost = fetchedPost;
      }

      return foundPost;
    }

    async function load() {
      if (customItemId) {
        const post = await loadPost(customItemId);
        setHnPost(post);
      } else {
        const post = await loadUserPost();
        setHnPost(post);
      }
    }

    if (hnPost === undefined) {
      load();
    }
  }, []);
  
  if (!hnPost?.score) {
    return null;
  }

  return (
    <span className="animate-fadeInWidth">
      <TagItem 
        image={hackerNewsIcon}
        customUrl={`https://news.ycombinator.com/item?id=${hnPost.id}`}
        key={hnPost.score} 
        tag={(
          <span>
            <span style={{ fontSize: 13 }}>{hnPost.score}</span> upvotes
          </span>
        )} 
      />
    </span>
);
}

export default HackerNews
