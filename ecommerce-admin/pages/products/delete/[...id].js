import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const { default: Layout } = require("@/components/Layout");

export default function DeleteProductPage() {
  const [productInfo, setProductInfo] = useState();

  const router = useRouter();

  console.log(router.query);

  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);

  function goBack() {
    router.push("/products");
  }

  async function deleteProduct() {
    await axios.delete("/api/products?id=" + id);
    router.push("/products");
  }

  return (
    <Layout>
      <h1 className="text-center mt-4">
        Do you really want to delete the product "{productInfo?.title}"?
      </h1>
      <div className="flex justify-center">
        <button
          className="btn-primary mr-2 !bg-red-500"
          onClick={deleteProduct}
        >
          YES
        </button>
        <button className="btn-primary !bg-blue-500" onClick={goBack}>
          NO
        </button>
      </div>
    </Layout>
  );
}
