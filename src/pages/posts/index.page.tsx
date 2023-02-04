import { useContext } from "react";
import useSWR from "swr";
import Link from "next/link";
import dayjs from "dayjs";

import styles from "./styles/Posts.module.scss";

import MainLayout from "component/MainLayout";
import { DarkModeContext } from "context/DarkModeContext";

interface PostObject {
  id: number;
  title: string;
  description: string;
  author?: string;
  url?: string;
  dateCreated?: number;
  dateUpdated?: number;
}

export default function Posts(props: any) {
  const { colorTheme } = useContext(DarkModeContext);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data: posts } = useSWR("/api/readposts", fetcher);

  function Post({ post }: { post: PostObject }) {
    return (
      <div className={styles.post}>
        <h3 className={styles.postTitle}>
          <Link href={`/post/${post.id}`}>{post.title}</Link>
        </h3>
        <div className={styles.postStats}>
          {post.author && post.url && (
            <div className={styles.postAuthor}>
              written by{" "}
              <Link href={post.url} target="_blank">
                {post.author}
              </Link>
            </div>
          )}
          {post.dateCreated && post.dateUpdated && (
            <div className={styles.postDates}>
              {dayjs(post.dateCreated).format("MM/DD/YYYY h:mma")}, last
              updated: {dayjs(post.dateUpdated).format("MM/DD/YYYY h:mma")}
            </div>
          )}
        </div>
        <p className={styles.postDesc}>
          <blockquote>{post.description}</blockquote>
        </p>
      </div>
    );
  }

  return (
    <MainLayout heading="posts">
      <div className={`${styles.posts} ${styles[colorTheme]}`}>
        <h2>posts</h2>
        {posts &&
          posts.map((post: PostObject) => <Post key={post.id} post={post} />)}
        {!posts && <div>Loading...</div>}
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      title: "posts",
    },
  };
}
