
import Featured from '@/components/Featured.js'
import Header from '@/components/Header'
import NewProducts from '@/components/NewProducts';
import { mongooseConnect } from '@/lib/mongoose';
import Product from '@/models/ProductSchema';

export default function Home({featuredProduct, newProducts}) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct}/>
      <NewProducts newProducts={newProducts}/>
    </div>
  )
}


export async function getServerSideProps() {
  const featuredProductId = '649aa1377a41cfaff9ce0bdd';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts))
    }
  }
}