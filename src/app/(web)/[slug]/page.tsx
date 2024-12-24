import { getPayload } from "payload";
import configPromise from "@/payload.config";
import { cache } from "react";
import {notFound} from "next/navigation";

type Args = {
    params: Promise<{
      slug?: string
    }>
  }

export default async function Page({params: paramsPromise}: Args) {
  const {slug='home'} = await paramsPromise;
  const url = `/${slug}`;
  const page = await queryPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return <article className="pt-16 pb-24">
    <h1>{url}</h1>
  </article>;
}

const queryPageBySlug = cache(async (slug: string) => {
 const payload = await getPayload({config: configPromise});
 const result = await payload.find({
    collection: 'pages',
    // draft,
    limit: 1,
    pagination: false,
    // overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })
  return result.docs?.[0] || null
});