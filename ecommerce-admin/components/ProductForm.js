import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

const ProductForm = ({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImges,
  category: existingCategory,
  properties: existingProperties
}) => {

  
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [category, setCategory] = useState(existingCategory || '');
  const [productProperties, setProductProperties] = useState(existingProperties || {});
  const [images, setImages] = useState(existingImges || []);
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState(null);

  const router = useRouter();

  useEffect(() => {
    axios.get('/api/categories').then(result => {
      setCategories(result.data)
    })
  }, [])

  async function saveProduct(event) {
    event.preventDefault();
    // console.log(productProperties);
    const data = { title, description, price, images, category, properties: productProperties };
    if (_id) {
      // update
      await axios.put("/api/products", { ...data, _id });
    } else {
      // create
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  }

  if (goToProducts) {
    router.push("/products");
  }

  async function uploadImages(e) {
    const files = e.target?.files;

    if (files?.length > 0) {
      setIsUploading(true);

      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      // files.forEach(file => data.append('file', file));
      const res = await axios.post("/api/upload", data);

      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
    }

    setIsUploading(false);
  }

  const updateImagesOrder = (images) => {
    setImages(images);
  }

  const propertiesToFill = [];

  if(categories?.length > 0 && category){
    let catInfo = categories.find(({_id}) => _id === category);
    propertiesToFill.push(...catInfo.properties);

    while(catInfo?.parent?._id){
      const parentCat = categories.find(({_id}) => _id === catInfo?.parent?._id);
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }

  function setProductProp(propName, value){
    setProductProperties(prev => {
      const propductProps = {...prev};
      propductProps[propName] = value;
      return propductProps;
    })
  }

  return (
    <form onSubmit={saveProduct}>
      <label htmlFor="">Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="">Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Uncategorized</option>
        {categories && categories.map(c => (
          <option value={c._id} key={c._id}>{c.name}</option>
        ))}
      </select>

      <h2 className="font-medium mt-1 text-blue-300">Properties</h2>

      {propertiesToFill.length > 0 && propertiesToFill.map(p => (
        <div className="" key={p._id}>
          <label>{p.name[0].toUpperCase()+p.name.substring(1)}</label>
          <div>
            <select value={productProperties[p.name]} onChange={(e) => setProductProp(p.name, e.target.value)}>
              <option value="">Select</option>
              {p.values.map(v => (
                <option value={v} key={v}>{v}</option>
              ))}
            </select>
          </div>
          
        </div>
      ))}

      <label htmlFor="">Photos</label>
      <div className="mb-2 flex flex-wrap gap-2 ">
        <ReactSortable list={images} setList={updateImagesOrder} className="flex gap-2 transition-all flex-wrap">
          {images?.length > 0 &&
            images.map((link) => (
              <div
                key={link}
                className="h-24 w-24 bg-white shadow-sm border border-gray-200 rounded-sm"
              >
                <img src={link} alt="" className="" />
              </div>
            ))}
          </ReactSortable>
          {isUploading && (
            <div className="w-24 h-24 border flex items-center justify-center flex-col text-sm gap-1 text-gray-500 rounded-md bg-gray-100">
              <Spinner/>
            </div>
          )}

        <label
          htmlFor="uploadInput"
          className="w-24 h-24 border border-primary flex items-center justify-center flex-col text-sm gap-1 text-primary rounded-sm bg-white shadow-sm hover:cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          Add image
          <input
            type="file"
            id="uploadInput"
            className="hidden"
            onChange={uploadImages}
          />
        </label>
      </div>

      <label htmlFor="">Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <label htmlFor="">Price (in USD)</label>
      <input
        placeholder="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button className="btn-primary">Save</button>
    </form>
  );
};

export default ProductForm;
