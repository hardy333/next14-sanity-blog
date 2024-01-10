import { fullBlog } from "@/app/_lib/interface";
import { client, urlFor } from "@/app/_lib/sanity";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import Image from "next/image";


export const revalidate = 60; // revalidate at most 30 seconds


export const metadata: Metadata = {
  title: '... This is blog hello hello',
  description: '... lorem ipsum lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum ',
  openGraph: {
    title: 'Acme',
    description: 'Acme is a...',
  },
}


async function getFullBlogPost(slug: string) {
  const query = `
      *[_type == "blog" && slug.current == "${slug}"]{
        title,
        smallDescription,
        "slug": slug.current,
        titleImage,
        content
      }[0]
    `;

  const data = await client.fetch(query);

  return data;
}

// shkjdhkjdh

const FullBlogPost = async ({ params }: { params: { slug: string } }) => {
  const data: fullBlog = await getFullBlogPost(params.slug);

  console.log("single data", data);

  return (
    <main className="">
      <div className="container" style={{ position: "relative" }}>
        <h1>Hello</h1>
        <Image src={urlFor(data.titleImage).url()} alt="image" width={1800} height={1000} />
        <h2>{data.title}</h2>
        <h4>{data.smallDescription}</h4>
        <div className="full-blog-post-content">

        <PortableText value={data.content} />
        </div>
        
      </div>
    </main>
  );
};

export default FullBlogPost;
