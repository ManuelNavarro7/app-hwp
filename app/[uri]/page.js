import { getClient } from "../lib/apollo.js";
import { gql } from "@apollo/client";
import Image from "next/image.js";
export default async function IndPost({ params }) {
  const queryPostByuri = gql`
    query PostByUri($uri: String!) {
      postBy(uri: $uri) {
        title
        content
        featuredImage {
          node {
            mediaItemUrl
          }
        }
      }
    }
  `;

  const urlImg = `https://headlessroadev.wpengine.com/${params.uri}`;
  console.log("GraphQL Endpoint URL:", urlImg);
  const { data } = await getClient().query({
    query: queryPostByuri, // Use "query" property to specify the query
    variables: {
      uri: urlImg,
    },
    context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  });

  const post = data?.postBy;

  const imgaF = `${post.featuredImage.node.mediaItemUrl}`;

  return (
    <main>
      <div className="siteHeader">
        <h1 className="title">{post.title}</h1>
      </div>
      <div className="div-main-content">
        <Image alt={post.title} width={700} height={500} src={imgaF}></Image>
        <article dangerouslySetInnerHTML={{ __html: post.content }}></article>
      </div>
    </main>
  );
}
