import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
// import Products from "../products"
import Product from "../Components/Product";
import { listProducts } from "../actions/productActions";

const HomeScreen = () => {
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const products=[]

  return (
    <>
      <h1>Lastest products</h1>

      <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>

                        <Product product={product} />
                    </Col>
                ))}

            </Row>
        </>
  );
};

export default HomeScreen;
