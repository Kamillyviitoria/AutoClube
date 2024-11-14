"use client";

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import Header from '../components/Header/Header';

const Checkout = () => {
    const router = useRouter();
    const [carrinho, setCarrinho] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        // Carrega o carrinho do Local Storage
        const carrinhoStorage = JSON.parse(localStorage.getItem('carrinho')) || [];
        setCarrinho(carrinhoStorage);

        // Calcula o valor total dos produtos
        const valorTotal = carrinhoStorage.reduce((acc, item) => acc + item.price, 0);
        setTotal(valorTotal);
    }, []);

    const confirmarPedido = () => {
        alert('Pedido confirmado! Obrigado pela compra!');
        // Limpa o carrinho após a confirmação
        localStorage.removeItem('carrinho');
        setCarrinho([]);
        router.push('/'); // Redireciona para a página inicial
    };

    const voltarParaLoja = () => {
        router.push('/');
    };

    return (
        <>
            <Header />
            <Container className="mt-5">
                <h1>Resumo da Compra</h1>
                {carrinho.length === 0 ? (
                    <div className="text-center mt-5">
                        <h4>Seu carrinho está vazio.</h4>
                        <Button className="mt-3" variant="primary" onClick={voltarParaLoja}>
                            Voltar para a Loja
                        </Button>
                    </div>
                ) : (
                    <>
                        <Row>
                            <Col md={8}>
                                <ListGroup variant="flush">
                                    {carrinho.map((produto, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row className="align-items-center">
                                                <Col md={2}>
                                                    <img 
                                                        src={produto.image} 
                                                        alt={produto.name} 
                                                        style={{ width: '100%' }} 
                                                    />
                                                </Col>
                                                <Col md={6}>
                                                    <h5>{produto.name}</h5>
                                                </Col>
                                                <Col md={4}>
                                                    <h5>R$ {produto.price},00</h5>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Col>
                            <Col md={4}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Total</Card.Title>
                                        <h3>R$ {total},00</h3>
                                        <Button 
                                            className="mt-3" 
                                            variant="success" 
                                            onClick={confirmarPedido}>
                                            Confirmar Pedido
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </>
                )}
            </Container>
        </>
    );
};

export default Checkout;
