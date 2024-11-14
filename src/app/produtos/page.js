"use client";

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { FaTruck, FaCreditCard, FaShieldAlt } from 'react-icons/fa';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const produtos = [
    { id: 1, name: "Boné preto com logo vermelho", price: 50, image: "/imagens/bonebranco.jpg" },
    { id: 2, name: "Camisa Marea", price: 60, image: "/imagens/camisa1.jpg" },
    { id: 3, name: "Copo vermelho | Edição Drift Tokyo 2023", price: 10, image: "/imagens/copopreto.jpg" },
    { id: 4, name: "Camisa - Edição Drift Tokyo", price: 60, image: "/imagens/camisa2.jpg" },
    { id: 5, name: "Copo preto | Edição Drift Tokyo 2023", price: 10, image: "/imagens/copovermelho.jpg" },
    { id: 6, name: "Boné rosa com logo branco", price: 50, image: "/imagens/bonerosa.jpg" },
];

const Loja = () => {
    const router = useRouter();
    const [carrinho, setCarrinho] = useState([]);

    useEffect(() => {
        const carrinhoStorage = JSON.parse(localStorage.getItem('carrinho')) || [];
        setCarrinho(carrinhoStorage);
    }, []);

    useEffect(() => {
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }, [carrinho]);

    const adicionarAoCarrinho = (produto) => {
        setCarrinho([...carrinho, produto]);
        alert(`${produto.name} foi adicionado ao carrinho!`);
    };

    const finalizarCompra = () => {
        router.push('/checkout');
    };

    const handleSaibaMais = () => {
        router.push('/checkout'); 
    };

    return (
        <>
            <Header />
            <Row className="mb-5">
                    <Col>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="/imagens/produtos.jpg"
                                    alt="Imagem 1"
                                    style={{ height: '400px', objectFit: 'cover' }}
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="/imagens/produtos.jpg"
                                    alt="Imagem 2"
                                    style={{ height: '400px', objectFit: 'cover' }}
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="/imagens/produtos.jpg"
                                    alt="Imagem 3"
                                    style={{ height: '400px', objectFit: 'cover' }}
                                />
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                </Row>
            <Container className="my-3">
                {/* Seção de Informações */}
                <Row className="bg-light py-4 justify-content-center">
                    <Col md={4} className="text-center">
                        <FaTruck size={50} />
                        <h5 className="mt-3">Frete</h5>
                        <p>Enviamos para todo o Brasil</p>
                    </Col>
                    <Col md={4} className="text-center">
                        <FaCreditCard size={50} />
                        <h5 className="mt-3">Cartões</h5>
                        <p>Aceitamos todos os cartões</p>
                    </Col>
                    <Col md={4} className="text-center">
                        <FaShieldAlt size={50} />
                        <h5 className="mt-3">Segurança</h5>
                        <p>Compre com total segurança</p>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-4">
                    
                    <Button 
                    className="justify-content-center mt-4" 
                    variant="success" 
                    style={{ borderRadius: '25px', fontWeight: 'bold', padding: '10px 20px' }}
                    onClick={finalizarCompra}>
                    FINALIZAR COMPRA!
                </Button>
                </Row>

                <h1 className="text-center mt-5">Produtos em destaque</h1>
                <Row>
                    {produtos.map((produto) => (
                        <Col key={produto.id} md={4} className="d-flex align-items-stretch">
                            <Card className="mb-3 shadow-sm" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                                <Card.Img 
                                    variant="top" 
                                    src={produto.image} 
                                    alt={produto.name} 
                                    style={{ height: '250px', objectFit: 'cover' }} 
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{produto.name}</Card.Title>
                                    <Card.Text className="mb-4">R$ {produto.price},00</Card.Text>
                                    <Button 
                                        variant="primary" 
                                        className="mt-auto"
                                        style={{ borderRadius: '20px', fontWeight: 'bold' }}
                                        onClick={() => adicionarAoCarrinho(produto)}>
                                        Adicionar ao Carrinho
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            
            </Container>
            <Footer />
        </>
    );
};

export default Loja;
