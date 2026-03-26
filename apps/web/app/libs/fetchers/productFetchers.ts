import { fetchGraphQL } from "../contentful/fetchGraphQL";
import { GET_ALL_PRODUCTS } from "../queries/productQueries";

export async function getAllProducts() {
  const data = await fetchGraphQL(GET_ALL_PRODUCTS);
  return data?.data?.productCollection?.items ?? [];
}
