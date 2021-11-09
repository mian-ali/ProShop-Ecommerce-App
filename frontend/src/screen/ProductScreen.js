import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap"
import Rating from '../Components/Rating'
// import products from "../products"
import { ListGroupItem } from 'react-bootstrap'
import axios from "axios"
const ProductScreen = ({ match }) => {


    const [product, setProduct] = useState({})

    useEffect(() => {

        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${match.params.id}`)
            setProduct(data)
        }
        fetchProduct()
    }, [match])
    console.log(product);


    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>{product.name}</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews}reviews`} />
                        </ListGroup.Item>

                        <ListGroup.Item>
                            price:${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description:{product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        price:
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>

                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        status:
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                                    </Col>

                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button className="btn-block" type="button" disabled={product.countInStock > 0}>
                                    Add to Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen
