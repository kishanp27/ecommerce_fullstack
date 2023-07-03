import { styled } from "styled-components";
import Center from "./Center";
import ProductsGrid from "./ProductsGrid";


const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 0;
  font-weight: 500;
`

export default function NewProducts({ newProducts }) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid products={newProducts} />
    </Center>
  );
}
