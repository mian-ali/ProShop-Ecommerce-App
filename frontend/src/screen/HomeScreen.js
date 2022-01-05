import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
// import Products from "../products"
import Product from "../Components/Product";
import Message from '../Components/Message'
import Loader from "../Components/Loader";
import { listProducts } from "../actions/productActions";

const HomeScreen = ({ match }) => {
const keyword =match.params.keyword

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch , keyword]);

  // const products=[]

  return (
    <>
      <h1>Lastest products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
