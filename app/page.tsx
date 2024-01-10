import Image from "next/image";
import { simpleBlogCard } from "./_lib/interface";
import { client, urlFor } from "./_lib/sanity";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "main page title",
  description: "main page description"
}

async function getData() {
  const query = `
    *[_type == "blog"]{
      title,
      smallDescription,
      "slug": slug.current,
      titleImage
    }
  `;
  const data = await client.fetch(query);

  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();


  return (
    <main>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div className="blog-cards-container" style={{width: "900px", margin: "auto"}}>
        {data.map((blogCard, index) => {
          return (
            <article key={index} className="blog-card">
              <Image
                src={urlFor(blogCard.titleImage).url()}
                width={300}
                height={300}
                alt="image"
                //  placeholder="blur" 
                 style={{backgroundColor: "red"}}
              />
              <h2 className="blog-card__title">{blogCard.title}</h2>
              <p className="blog-card__description">
                {blogCard.smallDescription}
              </p>

              <Link  href={`/blog/${blogCard.slug}`}>Read more  -{">"}</Link>
            </article>
          );
        })}
      </div>
      
    </main>
  );
}
