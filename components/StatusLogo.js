import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const StatusLogo = ({ blogTitle }) => {
  const [status, setStatus] = useState("offline");

  useEffect(() => {
    fetch("http://localhost:8080")
      .then((res) => res.json())
      .then((status) => {
        setStatus(status.userStatus);
      }).catch(() => {
        setStatus("offline")
      });
  }, []);

  return (
    <Link href="/" aria-label={blogTitle}>
      <Image
        src={`/logos/v_logo_${status}.svg`}
        width={24}
        height={24}
        alt={blogTitle}
      />
    </Link>
  );
};

export default StatusLogo;
