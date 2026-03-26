// Helper function to fetch data from Contentful GraphQL API
export async function fetchGraphQL(query: string, preview = false) {
  const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
  const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;
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
    },
  );
  return res.json();
}
