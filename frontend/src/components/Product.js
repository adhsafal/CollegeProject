import React from "react";
import Contact from './Contact';
import Features from './Features';


/* REACT-BOOTSTRAP */
import { Card } from "react-bootstrap";

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* COMPONENTS */
import Rating from "./Rating";

function Product({ product }) {
  return (
    <div>
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
            color={"#f8e825"}
          />
        </Card.Text>

        <Card.Text as="h3">Rs.{product.price}</Card.Text>
      </Card.Body>
    </Card>

    </div>
    
  );
}

export default Product;
