import React, { useEffect, useState } from "react";

const App = () => {
  const [products, setproducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalpage, setTotalPage] = useState(0);
  const fetchproduct = async () => {
    const res = await fetch(
      `https://dummyjson.com/products/?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();
    console.log(data);
    if (data && data.products) {
      setproducts(data.products);
      setTotalPage(data.total / 10);
    }
  };

  useEffect(() => {
    fetchproduct();
  }, [page]);

  const setPagehandler = (i) => {
    // console.log(i + 1);
    setPage(i + 1);
  };
  console.log(page);
  console.log(products);
  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.map((prod) => (
            <span key={prod.id} className="prod__single">
              <img src={prod.thumbnail} alt={prod.title} />
              <span>{prod.title}</span>
            </span>
          ))}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            style={{ display: page == 1 && "none" }}
            onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : prev))}
          >
            ⬅️
          </span>
          {[...Array(totalpage)].map((_, ind) => (
            <span
              onClick={() => setPagehandler(ind + 1)}
              key={ind}
              style={{ display: page !== ind + 1 ? "none" : "" }}
            >
              {ind + 1} - 10
            </span>
          ))}
          <span
            style={{ display: page == 10 && "none" }}
            onClick={() => setPage((prev) => (prev < 10 ? prev + 1 : prev))}
          >
            ➡️
          </span>
        </div>
      )}
    </div>
  );
};

export default App;
