import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import { useContext, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { useRouter } from "next/router";
import Table from "@/components/Table";
import Input from "@/components/Input";
import axios from "axios";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px){
    grid-template-columns: 1.3fr 0.7fr;
    gap: 40px;
    margin-top: 40px;
    margin-bottom: 40px;
  }
  gap: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const QuantityLabel = styled.span`
  padding: 0 13px;
  display: block;
  @media screen and (min-width: 768px){
    display: inline;
    padding: 0 3px;
  }
`

export default function CartPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    city: "",
    postalCode: "",
    streetAddress: "",
    country: "",
  });

  const {
    cartProducts,
    setCartProducts,
    addProductToCart,
    removeProductFromCart,
    clearCart,
  } = useContext(CartContext);

  useEffect(() => {
    if (window.location.href.includes("success")) {
      clearCart();
      window.localStorage.removeItem('cart')
    }
  },[]);

  const key = "_id";

  const uniqueProducts = [
    ...new Map(cartProducts?.map((item) => [item[key], item])).values(),
  ];

  function increaseQuantity(product) {
    // setCartProducts((prev) => [...prev, {...product}]);
    addProductToCart({ ...product });
  }

  function decreaseQuantity(product) {
    removeProductFromCart(product);
  }

  async function goToPayment() {
    const products = [...cartProducts.map((p) => p._id)];
    const data = { ...form, products };
    console.log(data);
    const response = await axios.post("/api/checkout", { ...form, products });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  let total = 0;

  for (const product of cartProducts) {
    total += product.price;
  }

  if (window.location.href.includes("success")) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will email you once it is dispatched.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Cart</h2>
            {cartProducts?.length > 0 ? (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {uniqueProducts.map((product) => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <div>
                          <img src={product.images? product.images[0] : ''} alt="" />
                        </div>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button onClick={() => decreaseQuantity(product)}>
                          -
                        </Button>
                        <QuantityLabel>
                          {
                            cartProducts.filter(
                              (products) => products._id === product._id
                            ).length
                          }
                        </QuantityLabel>
                        <Button onClick={() => increaseQuantity(product)}>
                          +
                        </Button>
                      </td>
                      <td>
                        $
                        {cartProducts.filter(
                          (products) => products._id === product._id
                        ).length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td style={{ fontWeight: "600" }}>${total}</td>
                  </tr>
                </tbody>
              </Table>
            ) : (
              <div>Your cart is empty</div>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <h2>Order Information</h2>
              <Input
                type="text"
                placeholder="Name"
                value={form.name}
                name="name"
                onChange={(e) =>
                  setForm((prev) => {
                    return { ...prev, name: e.target.value };
                  })
                }
              />

              <Input
                type="text"
                placeholder="Email"
                value={form.email}
                name="email"
                onChange={(e) =>
                  setForm((prev) => {
                    return { ...prev, email: e.target.value };
                  })
                }
              />

              <div style={{ display: "flex", gap: "5px" }}>
                <Input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={form.city}
                  onChange={(e) =>
                    setForm((prev) => {
                      return { ...prev, city: e.target.value };
                    })
                  }
                />
                <Input
                  type="text"
                  placeholder="Postal code"
                  value={form.postalCode}
                  name="postalCode"
                  onChange={(e) =>
                    setForm((prev) => {
                      return { ...prev, postalCode: e.target.value };
                    })
                  }
                />
              </div>

              <Input
                type="text"
                placeholder="Street Address"
                name="streetAddress"
                value={form.streetAddress}
                onChange={(e) =>
                  setForm((prev) => {
                    return { ...prev, streetAddress: e.target.value };
                  })
                }
              />

              <Input
                type="text"
                placeholder="Country"
                name="country"
                value={form.country}
                onChange={(e) =>
                  setForm((prev) => {
                    return { ...prev, country: e.target.value };
                  })
                }
              />

              <Button block={1} black={1} type="submit" onClick={goToPayment}>
                Continue to payment
              </Button>
              <Button
                onClick={() => {
                  window.localStorage.removeItem("cart");
                  setCartProducts([]);
                }}
                type="button"
                primary={1}
                outline={1}
                block={1}
              >
                Empty cart
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
