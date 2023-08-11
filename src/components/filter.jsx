import { useState } from "react";

const Filter = ({ productList, setFilterProducts ,fitlerProducts}) => {
  const [sort, setSort] = useState("new");
  const [search, setSearch] = useState("");
  const searchHandler = (e) => {
    const value = e.target.value.trim().toLowerCase();
    const filterProducts = productList.filter((item) =>
      item.title.toLowerCase().includes(value)
    );
    setFilterProducts(filterProducts);
  };

  const sortHandler = (e) => {
    setSort(e.target.value)
    const products = [...fitlerProducts];

    products.sort((a, b) => {
        
      if (e.target.value === "new") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
      } else if (e.target.value === "old") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
      } else {
        return productList;
      }
    });
    setFilterProducts(products)
  };

  return (
    <div className="flex justify-center">
      <div className="container max-w-xl px-4 mb-8">
        <h1 className="mb-5 font-bold text-left text-white text-md">
          Product list
        </h1>
        <div className="flex items-center justify-between mb-5">
          <p className="text-left text-slate-600 text-md">search</p>
          <input
            onChange={(e) => searchHandler(e)}
            type="search"
            className="p-2 bg-transparent border searchInput text-slate-300 border-slate-500 rounded-xl"
          />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-left text-slate-600 text-md">sort</p>
          <select
            onChange={(e) => sortHandler(e)}
            value={sort}
            className="p-2 mb-4 bg-transparent text-slate-400 rounded-xl w-[198px] selectSort"
          >
            <option className="bg-slate-500 text-slate-400" value="">
              sort By :
            </option>
            <option className="bg-slate-500 text-slate-400" value="new">
              newest
            </option>
            <option className="bg-slate-500 text-slate-400" value="old">
              oldest
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
