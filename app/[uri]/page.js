import { getClient } from "../lib/apollo.js";
import { gql } from "@apollo/client";
import Image from "next/image.js";
export default async function IndPost({ params }) {
  const queryPostByuri = gql`
    query PostByUri($id: ID!) {
      post(id: $id, idType: URI) {
        title
        content
        uri
        featuredImage {
          node {
            mediaItemUrl
          }
        }
      }
    }
  `;
  //   const queryPostByuri = gql`
  //     query PostByUri($uri: String!) {
  //       postBy(uri: $uri) {
  //         title
  //         content
  //         featuredImage {
  //           node {
  //             mediaItemUrl
  //           }
  //         }
  //       }
  //     }
  //   `;

  const urlF = params.uri;

  const { data } = await getClient().query({
    query: queryPostByuri, // Use "query" property to specify the query
    variables: {
      id: urlF,
    },
    context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  });

  const post = data.post;

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
