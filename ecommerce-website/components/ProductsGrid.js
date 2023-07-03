import { styled } from "styled-components";
import ProductBox from "./ProductBox";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  padding-top: 20px;
  @media screen and (min-width: 768px){
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

`;

export default function ProductsGrid({ products: newProducts }) {
    return (
        <StyledProductsGrid>
            {newProducts?.length > 0 &&
                newProducts.map((product) => (
                    <ProductBox {...product} key={product._id}></ProductBox>
                ))}
        </StyledProductsGrid>
    )
}