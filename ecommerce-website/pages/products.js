import Center from "@/components/Center";
import Header from "@/components/Header";
import { styled } from "styled-components";
import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/ProductSchema";
import ProductsGrid from "@/components/ProductsGrid";

const Title = styled.h1`
    font-size: 1.5rem;
`

export default function ProductsPage({products}) {
    return (
        <>
            <Header />
            <Center>
                <Title>All products</Title>
                <ProductsGrid products={products}/>
            </Center>

        </>
    )
}

export async function getServerSideProps(){
    await mongooseConnect();
    const products = JSON.parse(JSON.stringify(await Product.find({}, null, {sort: {'_id':-1}})))
    return {props: {
        products
    }}
}