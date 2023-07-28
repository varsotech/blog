import Link from 'next/link'
import Image from 'next/image'

const TagItem = ({ tag, image, customUrl }) => (
  <Link href={customUrl || `/tag/${encodeURIComponent(tag)}`} target={customUrl ?? "_blank"}>
    <p style={{ display: "flex", flexDirection: "row" }} className="mr-1 rounded-full border leading-none text-sm dark:border-gray-600">
    {
          image && (
            <Image
              alt={"tagimage"}
              width={22}
              height={22}
              src={image}
              className="rounded-full"
              style={{ padding: 2, marginRight: -4 }}
            />
          )
      }
      <span className="rounded-full px-2 py-1">
        {tag}
      </span>
    </p>
  </Link>
)

export default TagItem
