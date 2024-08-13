// app/api/getMetadata.js

import { fetchData } from "../../utils/api";

export async function getMetadata() {
    const data = await fetchData(`api/settings`);
    console.log(data)
    return {
      title: data?.title || "Emoco Egypt",
      description: data?.description || " Information About Emoco Egyp",
      openGraph: {
        images: data?.favicon,
        // apple: data.appleIcon || '/favicon.ico',
      },
    };
  }
  