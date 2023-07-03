import Button from "@/components/Button"
import { CartContext } from "@/components/CartContext"
import Center from "@/components/Center"
import Header from "@/components/Header"
import ProductImages from "@/components/ProductImages"
import CartIcon from "@/components/icons/CartIcon"
import { mongooseConnect } from "@/lib/mongoose"
import Product from "@/models/ProductSchema"
import { useContext } from "react"
import { styled } from "styled-components"

const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 800;
`
const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    margin-top: 40px;
    gap: 40px;

    @media screen and (min-width: 768px){
        grid-template-columns: 0.8fr 1.2fr;
    }
`

const Box = styled.div`
    @media screen and (min-width: 768px){
        display: block;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;


const PriceRow = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;

`


export default function ProductPage({ product }) {
    const { addProductToCart } = useContext(CartContext);
    return (
        <>
            <Header />
            <Center>
                <ColWrapper>
                    <Box>
                        <ProductImages images={product.images}></ProductImages>
                    </Box>
                    <div>
                        <Title>
                            {product.title}
                        </Title>
                        <p>{product.description}</p>
                        <PriceRow>
                            <span style={{ fontSize: '1.4rem' }}>${product.price}{' '}</span>
                            <Button primary={1} onClick={() => addProductToCart(product)}> <CartIcon /> Add to cart</Button>
                        </PriceRow>
                    </div>
                </ColWrapper>
            </Center>
        </>
    )
}

export async function getServerSideProps(context) {
    await mongooseConnect();
    const { id } = context.query;
    const product = JSON.parse(JSON.stringify(await Product.findById(id)));
    return {
        props: {
            product
        }
    }
}