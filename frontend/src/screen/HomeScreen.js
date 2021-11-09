import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Row, Col } from "react-bootstrap"
// import Products from "../products"
import Product from "../Components/Product"

const HomeScreen = () => {


    const [products, setProducts] = useState([])
    useEffect(() => {

        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products')
            setProducts(data)
        }
        fetchProducts()
    }, [])

    return (
        <>
            <h1>Lastest  products</h1>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>

                        <Product product={product} />
                    </Col>
                ))}

            </Row>
        </>
    )
}

export default HomeScreen
