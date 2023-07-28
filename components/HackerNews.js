import 'gitalk/dist/gitalk.css'
import { useEffect, useState } from 'react'
import { useConfig } from '@/lib/config'
import TagItem from '@/components/TagItem'
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child } from "firebase/database";
import hackerNewsIcon from '../public/hackernews.png';


const HackerNews = ({ slug, className }) => {
  const BLOG = useConfig()
  const [ hnPost, setHnPost ] = useState()

  var config = {
    databaseURL: "https://hacker-news.firebaseio.com",
  };

  const app = initializeApp(config);
  getDatabase(app);
  const dbRef = ref(getDatabase());

  useEffect(() => {
    async function load() {
      const userData = await get(child(dbRef, `v0/user/jl`));
      
      if (!userData.exists()) {
        console.log("No data available");
        setHnPost({});
        return;
      }
  
      const submittedPosts = userData.val().submitted

      let foundPost = {}
      for (let index = 0; index < submittedPosts.length; index++) {
        const submittedPostId = submittedPosts[index];
        const fetchedPost = await get(child(dbRef, `v0/item/${submittedPostId}`));
        if (!fetchedPost.exists()) {
          continue;
        }

        const fetchedPostData = fetchedPost.val();;
        if (!fetchedPostData.url) {
            continue;
        }

        if (!fetchedPostData.url.startsWith(`${BLOG.link}/${slug}`)) {
            continue;
        }

        foundPost = fetchedPostData;
      }

      setHnPost(foundPost);
    }

    if (hnPost === undefined) {
      load();
    }
  }, []);
  
  console.log("hnPost", hnPost);

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
