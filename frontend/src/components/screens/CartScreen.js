import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Button, Image, ListGroup, Form } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../../actions/cartActions'

import ErrorMessage from '../ErrorMessage'

const CartScreen = ({ match, location, history }) => {

    const productId = match.params.id

    // gets us ?quantity=1
    const quantity = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    // if a product is present in path params -> dispatch an action
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, quantity))
        }
    }, [dispatch, productId, quantity])

    const cart = useSelector(state => state.cart)

    const { cartItems } = cart;

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkOutHandler = () => {
        console.log("checked out")
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1> Shopping Cart </h1>

                {cartItems.length === 0 ? (
                    <ErrorMessage>
                        Your cart is empty.
                        <Link to='/'>
                            <Button type='button' variant='info'>
                                Go Back
                            </Button>
                        </Link>
                    </ErrorMessage>) :

                    (<ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product} >
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>

                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}> {item.name}</Link>
                                    </Col>

                                    <Col md={2}>
                                        ${item.price}
                                    </Col>

                                    <Col md={2}>
                                        <Form.Control as='select' value={item.quantity} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                            {
                                                [...Array(item.countInStock).keys()].map(i => (<option key={i + 1} value={i + 1}> {i + 1} </option>))
                                            }
                                        </Form.Control>
                                    </Col>

                                    <Col md={2}>
                                        <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                            <i className='fas fa-trash'> </i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}

                    </ListGroup>)}
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2> Subtotal ({cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0)}) items</h2>

                            ${cartItems.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0).toFixed(2)}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkOutHandler}> Proceed To Checkout</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>

        </Row>
    )
}

export default CartScreen
