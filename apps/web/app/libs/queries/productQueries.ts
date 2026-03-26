export const GET_ALL_PRODUCTS = `
  query {
    productCollection {
      items {
        id,
        productName
      }
    }
  }
`;
