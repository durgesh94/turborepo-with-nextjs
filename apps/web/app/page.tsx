import { Button } from "@repo/ui/button";
import { Box } from "@repo/ui/Box";
import { getAllProducts } from "./libs/fetchers/productFetchers";
import styles from "./page.module.css";

export default async function Home() {
  const products = await getAllProducts();
  console.log(":::Fetched data:", products);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Button appName="web" className={styles.secondary}>
          Open alert
        </Button>
        <Box />
        <h1>Products from Contentful:</h1>
        <ul>
          {products?.map((product: any) => (
            <li key={product.id}>{product.productName}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}
