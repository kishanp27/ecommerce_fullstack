import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const Categories = () => {
  // const categoryNameRef = useRef('');

  const [editing, setEditing] = useState(null);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const response = await axios.get("/api/categories");
    setCategories(response.data);
  }

  const saveCategory = async (event) => {
    event.preventDefault();

    const data = { name, parentCategory, properties };

    if (editing) {
      await axios.put("/api/categories", { ...data, id: editing._id });
      setParentCategory("");
      setEditing(null);
    } else {
      await axios.post("/api/categories", data);
    }

    alert("Your category is saved. Click ok to continue.");
    setName("");
    setParentCategory("");
    setEditing(null);
    setProperties([]);
    fetchCategories();
  };

  const deleteCategory = async (id) => {
    const deleteConfirmation = confirm("Are you sure you want to delete?");

    if (!deleteConfirmation) return;

    const response = await axios.delete("/api/categories?id=" + id);
    console.log(response.data);
    fetchCategories();
  };

  const editCategory = (category) => {
    setEditing(category);
    setName(category.name);
    setParentCategory(category.parent ? category.parent._id : "");
    if (category.properties.length > 0) {
      const currentProperties = category.properties.map((p) => {
        return { name: p.name, values: p.values.join(", ") };
      });
      setProperties(currentProperties);
    }
  };

  const addProperty = () => {
    setProperties((prev) => {
      return [{ name: "", values: "" }, ...prev];
    });
  };

  function handlePropertyNameChange(index, property, newName) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }

  function handlePropertyValuesChange(index, property, newValues) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }

  function removeProperty(i) {
    console.log(i);
    setProperties((prev) => {
      const properties = [...prev];
      const newProperties = properties.filter((p, index) => {
        return i !== index;
      });
      return newProperties;
    });
  }

  return (
    <Layout>
      <div className="flex justify-between">
        <h1> Categories </h1>
        <button
          className="btn-primary !bg-violet-400"
          onClick={() => {
            setName("");
            setParentCategory("");
            setProperties([]);
          }}
        >
          Clear Form
        </button>
      </div>
      <label>{editing ? "Edit Category" : "New category name"}</label>
      <form onSubmit={saveCategory}>
        <input
          type="text"
          placeholder={"Category name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="categoryDropdown">Select Parent Category</label>
        <select
          value={parentCategory}
          onChange={(e) => setParentCategory(e.target.value)}
          className="hover:cursor-pointer"
          id="categoryDropdown"
        >
          <option value="">No Parent Category</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
        </select>

        <div className="mb-2">
          <label htmlFor="" className="block">
            Properties
          </label>
          <button
            type="button"
            onClick={() => addProperty()}
            className="btn-primary !bg-gray-600 mb-2"
          >
            Add more properties
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div className="flex gap-1" key={index}>
                <input
                  type="text"
                  value={property.name}
                  placeholder="property name (example: color)"
                  onChange={(e) =>
                    handlePropertyNameChange(index, property, e.target.value)
                  }
                />
                <input
                  type="text"
                  value={property.values}
                  placeholder="values (comma separated)"
                  onChange={(e) =>
                    handlePropertyValuesChange(index, property, e.target.value)
                  }
                />
                <button
                  className="btn-primary !bg-red-500 mb-2 "
                  onClick={() => removeProperty(index)}
                  type="button"
                >
                  Remove
                </button>
              </div>
            ))}
        </div>

        {editing && (
          <button
            className="btn-primary !bg-red-500 mr-3"
            onClick={() => {
              setName("");
              setParentCategory("");
              setEditing(null);
              setProperties([]);
            }}
            type="button"
          >
            Cancel Editing
          </button>
        )}

        <button className="btn-primary" type="submit">
          Save
        </button>
      </form>

      {!editing && (
        <table className="basic mt-4">
          <thead>
            <tr className="font-medium">
              <td>Category name</td>
              <td>Parent Category</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((category) => (
                <tr key={category._id} >
                  <td>{category.name}</td>
                  <td>{category.parent?.name}</td>
                  <td>
                    <button
                      className="btn-primary mr-3"
                      onClick={() => {
                        editCategory(category);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-primary !bg-red-500"
                      onClick={() => {
                        deleteCategory(category._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
};

export default Categories;
