import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [products, setProducts] = useState([])

  // fetch products
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        // filter price >= 10
        const filtered = data.products.filter(
          (prod) => prod.price >= 10
        )
        setProducts(filtered)
      })
      .catch((err) => console.log(err))
  }, [])

  // convert USD to INR
  const usdToInr = (usd) => {
    return (usd * 83).toFixed(2)
  }

  // open image in new tab
  const openImage = (url) => {
    window.open(url, '_blank')
  }

  return (
    <div className="container">

      <h2 className="title">
        Product List (Price ≥ ₹830)
      </h2>

      <table className="product-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price (₹)</th>
            <th>Rating</th>
            <th>Discount %</th>
            <th>Return Policy</th>
            <th>Shipping Info</th>
            <th>Thumbnail</th>
          </tr>
        </thead>

        <tbody>
          {products.map((prod) => (

            <tr key={prod.id}>

              <td>{prod.id}</td>

              <td>{prod.title}</td>

              <td className="price">
                ₹{usdToInr(prod.price)}
              </td>

              <td>
                ⭐ {prod.rating}
              </td>

              <td>
                {prod.discountPercentage}%
              </td>

              <td>
                7 Days Return
              </td>

              <td>
                Free Shipping
              </td>

              <td>
                <img
                  src={prod.thumbnail}
                  alt={prod.title}
                  className="product-img"
                  onClick={() => openImage(prod.thumbnail)}
                  style={{ cursor: "pointer" }}
                />
              </td>

            </tr>

          ))}
        </tbody>

      </table>

    </div>
  )
}

export default App