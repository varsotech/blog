import { useConfig } from "@/lib/config";
import { useState, useEffect } from "react";

const emojis = ["🏳️‍🌈", "☕️", "💜", "✨", "💻"];

const Footer = ({ fullWidth }) => {
  const BLOG = useConfig();

  const d = new Date();
  const y = d.getFullYear();
  const from = +BLOG.since;

  const [emojiIndex, setEmojiIndex] = useState(false);
  useEffect(() => {
    setEmojiIndex(Math.floor(Math.random() * emojis.length));
  }, []);

  return (
    <div
      className={`mt-6 flex-shrink-0 m-auto w-full text-gray-500 dark:text-gray-400 transition-all ${
        !fullWidth ? "max-w-2xl px-4" : "px-4 md:px-24"
      }`}
    >
      <hr className="border-gray-200 dark:border-gray-600" />
      <div className="my-4 text-sm leading-6">
        <div className="flex align-baseline justify-between flex-wrap">
          <p>Made with {emojis[emojiIndex]} by L</p>
          <p style={{ fontSize: 11 }}>
            <a
              href="https://github.com/varsotech/blog"
              style={{ marginRight: 5 }}
            >
              [ GitHub ]
            </a>
            <a href="https://discord.gg/cfPPYpAqAk">[ Discord ]</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
