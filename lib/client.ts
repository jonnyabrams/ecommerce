import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "2xs6c7sa",
  dataset: "production",
  apiVersion: "2022-03-10",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

// details from `sanity manage`

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);
