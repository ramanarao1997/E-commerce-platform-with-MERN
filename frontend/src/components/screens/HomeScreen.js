import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'

import Product from '../Product'
import ErrorMessage from '../ErrorMessage'
import Loader from '../Loader'

import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../../actions/productActions'

const HomeScreen = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    const productList = useSelector(state => state.productList)
    const { loading, products, error } = productList

    return (
        <>
            <h1> Latest Products </h1>

            {loading ? <Loader /> : error ? <ErrorMessage variant='danger'> {error} </ErrorMessage> : <Row>
                {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>}

        </>
    )
}

export default HomeScreen
