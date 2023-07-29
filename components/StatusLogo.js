import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useConfig } from '@/lib/config'
import useTheme from '@/lib/theme'


const StatusLogo = () => {
  const BLOG = useConfig()
  const { dark } = useTheme()
  const [status, setStatus] = useState("offline");

  const darkSuffix = dark ? ".dark" : "";
  
  useEffect(() => {
    fetch(BLOG.discordStatusServerUrl)
      .then((res) => res.json())
      .then((status) => {
        setStatus(status.userStatus);
      }).catch((err) => {
        console.log("couldn't retrieve status", err)
        setStatus("offline")
      });
  }, [BLOG.discordStatusServerUrl]);

  return (
    <Link href="/" aria-label={BLOG.title}>
      <Image
        src={`/logos/v_logo_${status}${darkSuffix}.svg`}
        width={24}
        height={24}
        alt={BLOG.discordStatusServerUrl}
      />
    </Link>
  );
};

export default StatusLogo;
