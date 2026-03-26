import { Button } from "@repo/ui/button";
import { Box } from "@repo/ui/Box";
import {fetchGraphQL, fetchContent} from "./libs/api";
import styles from "./page.module.css";

const BLOG_QUERY = `
 query {
  companyCollection {
    items {
      id,
      name,
      # Add other fields you want to fetch here
    }
  }
}
`;

export default async function Home() {

  const {data} = await fetchGraphQL(BLOG_QUERY);
  const companies = data?.companyCollection?.items || [];
  console.log(":::Fetched data:", data, companies);

  const content = await fetchContent("product");
  console.log(":::Fetched content:", content);


  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Button appName="web" className={styles.secondary}>
          Open alert
        </Button>
        <Box/>
        <h1>Companies from Contentful:</h1>
        <ul>
          {companies.map((company: any) => (
            <li key={company.id}>{company.name}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}
