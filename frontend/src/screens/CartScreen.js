import React, { useEffect } from "react";

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* REACT BOOTSTRAP */
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";

/* COMPONENTS */
import Message from "../components/Message";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { addToCart, removeFromCart } from "../actions/cartActions";

function CartScreen({ match, location, history }) {
  /* GETTING DATA FROM URL IF PRESENT */
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  //qty: '?qty=3' -> ['?qty',3] -> 3

  /* FIRING OFF DISPATCH, BUT ONLY IF WE HAVE A PRODUCT ID & qty */
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const orders = JSON.parse(localStorage.getItem('Orders'));
  console.log(orders)

  useEffect(() => {
  }, []);


  /* HANDLERS */

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };



  return (
    <div className="container">
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          <div>
            <ListGroup variant="flush" >
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product} >
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col m={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col>₹{item.price}</Col>
                    <Col md={3}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={1}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <ListGroup variant="flush">
              {orders.map((item) => (
                <ListGroup.Item key={item.name} style={{ padding: '30px 10px' }}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col m={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col>
                      <h4>Price</h4>
                      <h5>₹{item.price}</h5>
                    </Col>
                    <Col md={3}>
                      {/* <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control> */}
                      <h4>Quantity</h4>
                      <h5>{item.qty}</h5>
                    </Col>
                    <Col>
                      <h4>Size</h4>
                      <h5>{item.size}</h5>
                    </Col>
                    <div>
                      <h4>Colors</h4>
                      {item.colors.map((item, index) =>
                        <p style={{ display: 'flex', width: 'fit-content' }} key={index}>{Object.entries(item).map(([key, value]) => (
                          <div>
                            <table style={{ border: '1px solid black' }}>
                              <tr>
                                <th style={{ border: '1px solid black', padding: '5px 20px' }}>
                                  {key}
                                </th>
                              </tr>
                              <tr>
                                <td style={{ border: '1px solid black', padding: '5px 20px' }}>
                                  {value}
                                </td>
                              </tr>
                            </table>
                          </div>
                        ))}</p>
                      )}
                    </div>
                    {/* <Col md={1}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col> */}
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Col>
        <Col md={4}>
          <Card>
            {/* <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  items
                </h2>
                ₹
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
            </ListGroup> */}
            <ListGroup.Item>
              <Button
                type="button"
                className="w-100"
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </Card>
        </Col>
      </Row >
    </div>
  );
}

export default CartScreen;
