const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

export async function fetchGraphQL(query: string, preview = false) {
  console.log(":::Fetching GraphQL with query:", query);
  console.log(":::Using SPACE_ID:", SPACE_ID);
  console.log(":::Using ACCESS_TOKEN:", ACCESS_TOKEN ? "****" : "not set");
  const res = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
      // Optional: Add next cache tags for on-demand revalidation
      next: { tags: ["contentful"] }, 
    }
  );
  console.log(":::GraphQL response status:", res.status);
  console.log(":::GraphQL response:", res);
  return res.json();
}

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
    throw new Error(`Contentful fetch error: ${res.status} ${res.statusText} - ${errorText}`);
  }

  const data = await res.json();
  return data.items;
};