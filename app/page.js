import Image from "next/image";
import styles from "./page.module.css";
import Footer from "../app/components/Footer.js";
import PostCard from "../app/components/PostCard.js";
import { getClient } from "./lib/apollo.js";
import { gql } from "@apollo/client";

export default async function Home() {
  const query = gql`
    query GetAllPosts {
      posts {
        nodes {
          title
          content
          uri
          featuredImage {
            node {
              uri
            }
          }
        }
      }
    }
  `;

  const { data } = await getClient().query({
    query,
    context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  });

  const posts = data?.posts?.nodes;

  return (
    <div className="container">
      <main>
        <h1 className="title">Headless WordPress Next.js Starter</h1>

        <p className="description">
          Get started by editing <code>app/page.js</code>
        </p>

        <div className="grid">
          {posts.map((post) => {
            return <PostCard key={post.uri} post={post}></PostCard>;
          })}
        </div>
      </main>

      <Footer></Footer>
    </div>
    //   <main className={styles.main}>
    //     <div style={{ color: "black" }}>
    //       {posts.map((post) => (
    //         <div key={post.uri}>
    //           <h1>{post.title}</h1>
    //           <p>{post.content}</p>
    //         </div>
    //       ))}
    //     </div>
    //   </main>
  );
}
