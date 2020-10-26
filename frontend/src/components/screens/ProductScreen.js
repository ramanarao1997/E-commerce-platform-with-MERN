import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, Card, ListGroup, Button } from 'react-bootstrap'

import Rating from '../Rating'
import ErrorMessage from '../ErrorMessage'
import Loader from '../Loader'

import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../../actions/productActions'

const ProductScreen = ({ match }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match])

    const productList = useSelector(state => state.productDetails)

    const { loading, product, error } = productList

    return (
        <>
            <Link className='btn btn-dark my-3' to='/'> Back </Link>

            {loading ? <Loader /> : error ? <ErrorMessage variant='danger'> {error} </ErrorMessage> :
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3> {product.name} </h3>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                            </ListGroup.Item>

                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Price:
                                    </Col>
                                        <Col>
                                            <strong> ${product.price} </strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Status:
                                    </Col>
                                        <Col>
                                            {product.countInStock > 0 ? ' In-stock' : 'Out of stock'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button className='btn-block' type='button' disabled={product.countInStock === 0}>
                                        Add to cart
                                </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            }
        </>
    )
}

export default ProductScreen
