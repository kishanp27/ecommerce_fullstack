import { styled } from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const ProductWrapper = styled.div`
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const WhiteBox = styled(Link)`
  background-color: white;
  padding: 20px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  margin: 0;
  text-decoration: none;
  color: inherit;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
  display: inline;
  p {
    font-weight: bold;
    font-size: 1.1rem;
  }
  @media screen and (min-width: 768px){
      p {
      font-size: 1.5rem;
    }
  }
  

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
  }
`;

export default function ProductBox({ _id, title, description, price, images }) {
  const url = "/product/" + _id;

  const { addProductToCart } = useContext(CartContext);

  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images?.[0]} alt="" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <div>
          <p>${price}</p>
          <Button primary={1} outline={1} onClick={() => addProductToCart({_id, title, price, images})}>
            <CartIcon />
          </Button>
        </div>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
