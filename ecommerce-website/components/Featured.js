import { styled } from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { CartContext } from "./CartContext";
import { useContext } from "react";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
  padding-top: 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;
  @media screen and (min-width: 768px){
    font-size: 3rem;
  }
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  img {
    max-width: 100%;
    max-width: 300px;
    padding: 0;
    display: block;
    margin: 0 auto;
  }
  div: nth-child(1) {
    order: 2;
  }
  @media screen and (min-width: 768px){
    grid-template-columns: 0.9fr 1.1fr;
    div: nth-child(1) {
      order: 0;
    }
    img {
      max-width: 100%;
    }
    gap: 30px;
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

export default function Featured({ product }) {
  const { cartProducts, setCartProducts, addProductToCart } = useContext
  console.log(product.images);
  return (
    <Bg>
      <Center>
        <Wrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Desc>
                {product.description},
                as we review our approach to transparency reporting in light of
                innovations in content moderation and changes in the regulatory
                landscape, we believe it’s important to share data from H1 2022
                on our health & safety efforts. We won’t be publishing a formal
                transparency report for this period (January 1 - June 30, 2022)
                in our previous format.
              </Desc>
              <ButtonWrapper>
                <ButtonLink href={'/product/' + product._id} white={1} outline={1}>
                  Read more
                </ButtonLink>
                <Button white={1} onClick={() => addProductToCart(product._id)}>
                  <CartIcon />
                  Add to cart
                </Button>
              </ButtonWrapper>
            </div>
          </Column>

          <Column style={{backgroundColor: 'transparent'}}>
            <img
              src={product.images?.[4]}
              alt=""
            />
          </Column>
        </Wrapper>
      </Center>
    </Bg>
  );
}
