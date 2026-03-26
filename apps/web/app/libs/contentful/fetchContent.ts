// Helper function to fetch entries of a specific content type from Contentful REST API
export const fetchContent = async (contentType: string) => {
  const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
  const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;
  if (!SPACE_ID || !ACCESS_TOKEN) {
    throw new Error("Missing Contentful SPACE_ID or ACCESS_TOKEN");
  }
  const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?content_type=${contentType}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `Contentful fetch error: ${res.status} ${res.statusText} - ${errorText}`,
    );
  }

  const data = await res.json();
  return data.items;
};
