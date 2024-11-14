"use client";

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Carousel } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import Header from '../components/Header/Header';
import { FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import Footer from '../components/Footer/Footer';

const lojasLocais = [
    { id: '1', title: 'MOTOR TECH', services: 'Peças e novas e usadas, retífica de motores, centro automotivo.', phone: '(61) 3355-1493', address: 'Taguatinga - Distrito Federal', CEP: '72130-720', image: '/imagens/motortech.png' },
    { id: '2', title: 'RCK PNEUS', services: 'Venda e distribuição de pneus nacionais importados e remold. Auto center completo com serviços de manutenção automotiva, suspensão, alinhamento e muito mais.', phone: '(61) 99646-8056', address: 'Taguatinga - Distrito Federal', CEP: '72125-250', image: '/imagens/rck.jpg' },
    { id: '3', title: 'AUTO CLUBES', services: 'Clube automotivo com diversas opções de lojas e serviços para entusiastas de automóveis.', phone: '', address: 'Distrito Federal/DF', CEP: '', image: '/imagens/autoclubes.jpg' },
    { id: '4', title: 'LZO SUSPENSÕES', services: 'Serviços especializados em suspensão de veículos.', phone: '(61)3355-0000', address: 'Distrito Federal/DF', CEP: '', image: '/imagens/lzo.jpg' },
    { id: '5', title: 'JOFRE GARAGE', services: 'Oficina mecânica e serviços automotivos.', phone: '(61)3355-0000', address: 'Distrito Federal/DF', CEP: '', image: '/imagens/jofregarage.jpg' },
    { id: '6', title: 'APROVEC BRASIL', services: 'Proteção veicular completa.', phone: '(61)3355-0000', address: 'Distrito Federal/DF', CEP: '', image: '/imagens/aprovecbrasil.jpg' },
    { id: '7', title: 'PRODUÇÃO FLAVINHO CH', services: 'Produção audiovisual voltada para o setor automotivo.', phone: '(61)3355-0000', address: 'Distrito Federal/DF', CEP: '', image: '/imagens/flavinhoch.jpg' },
    { id: '8', title: 'BANDLUX DIESEL', services: 'Mecânica especializada em veículos a diesel.', phone: '(61)3355-0000', address: 'Distrito Federal/DF', CEP: '', image: '/imagens/bandluxdiesel.jpg' },
    { id: '9', title: 'TRATO NA LATA ESTÉTICA AUTOMOTIVA', services: 'Serviços de estética automotiva.', phone: '(61)3355-0000', address: 'Distrito Federal/DF', CEP: '', image: '/imagens/tratonalata.jpg' },
    { id: '10', title: 'PRESUNTINHO SUSPENSOES', services: 'Especializada em suspensão de veículos.', phone: '(61)3355-0000', address: 'Distrito Federal/DF', CEP: '', image: '/imagens/presuntinho.jpg' },
    { id: '11', title: 'ALEMÃO MOTOR SPORT', services: 'Preparação e personalização de veículos.', phone: '(61)3355-0000', address: 'Distrito Federal/DF', CEP: '', image: '/imagens/alemaomotorsport.jpg' },
    { id: '12', title: 'POTENZ FULL DETAILLING', services: 'Serviços de detalhamento automotivo.', phone: '(61)3355-0000', address: 'Distrito Federal/DF', CEP: '', image: '/imagens/potenz.jpg' },
    { id: '13', title: 'FS CORRETORA DE SEGUROS AUTO', services: 'Corretora especializada em seguros automotivos.', phone: '(61) 98159-0570', address: 'Distrito Federal/DF', CEP: '', image: '/imagens/fscorretora.jpg' },
    { id: '14', title: 'RON CAR', services: 'Centro automotivo e reparação de veículos.', phone: '(61)3355-0000', address: 'Distrito Federal/DF', CEP: '', image: '/imagens/roncar.jpg' },
    { id: '15', title: 'LIRA GARAGEM', services: 'Oficina e garagem para serviços automotivos.', phone: '(61)3355-0090', address: 'Distrito Federal/DF', CEP: '', image: '/imagens/liragaragem.jpg' },
    { id: '16', title: 'ALX CENTRO AUTOMOTIVO', services: 'Centro automotivo completo.', phone: '(61)3355-0040', address: 'Distrito Federal/DF', CEP: '', image: '/imagens/alxpef.jpg' },
    { id: '17', title: 'L2H PERFORMANCE', services: 'Serviços de performance automotiva.', phone: '(61)3355-1010', address: 'Distrito Federal/DF', CEP: '', image: '/imagens/l2.jpg' },
    { id: '18', title: 'STOFCAR', services: 'Especialista em estofamento automotivo.', phone: '(61)3355-2020', address: 'Distrito Federal/DF', CEP: '', image: '/imagens/stofcar.jpg' }
];



const styles = {
    cardCustom: {
        width: '100%',
        height: '500px',
        overflow: 'hidden',
    },
    cardImgTop: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        cursor: 'pointer',
    },
    cardBody: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
    },
};

const StoreListPage = () => {
    const router = useRouter();
    const [lojas, setLojas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedStore, setSelectedStore] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [storeToDelete, setStoreToDelete] = useState(null);

    useEffect(() => {
        const lojasStorage = JSON.parse(localStorage.getItem('lojas')) || [];
        setLojas([...lojasLocais, ...lojasStorage]);
    }, []);

    const excluir = (id) => {
        setStoreToDelete(id);
        setShowConfirmModal(true);
    };

    const handleConfirmDelete = () => {
        const updatedLojas = lojas.filter(item => item.id !== storeToDelete);
        localStorage.setItem('lojas', JSON.stringify(updatedLojas));
        setLojas(updatedLojas);
        setShowConfirmModal(false);
        setStoreToDelete(null);
    };

    const handleCancelDelete = () => {
        setShowConfirmModal(false);
        setStoreToDelete(null);
    };

    const editar = (id) => {
        router.push(`/lojas/form/${id}`);
    };

    const handleImageClick = (store) => {
        setSelectedStore(store);
        setShowModal(true);
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
                                    src="/imagens/exemplo.jpg"
                                    alt="Imagem 1"
                                    style={{ height: '400px', objectFit: 'cover' }}
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="/imagens/exemplo2.jpg"
                                    alt="Imagem 2"
                                    style={{ height: '400px', objectFit: 'cover' }}
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="/imagens/exemplo3.jpg"
                                    alt="Imagem 3"
                                    style={{ height: '400px', objectFit: 'cover' }}
                                />
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                </Row>

            <Container>
                <Row className="mb-3">
                    <Col>
                        <Button variant="danger" href="/lojas/form">Criar Nova Loja</Button>
                    </Col>
                </Row>
                <Row>
                    {lojas.map((item) => (
                        <Col key={item.id} md={3}> 
                            <Card className="mb-3" style={styles.cardCustom}>
                                <Card.Img 
                                    variant="top" 
                                    src={item.image} 
                                    style={styles.cardImgTop} 
                                    onClick={() => handleImageClick(item)}
                                />
                                <Card.Body style={styles.cardBody}>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text>
                                      <strong>Serviços:</strong> {item.services} <br />
                                        <FaPhoneAlt /> {item.phone} <br />
                                        <FaMapMarkerAlt /> {item.address} {item.complement && `- ${item.complement}`} {item.number && `- ${item.number}`} <br />
                                    </Card.Text>
                                    <div className="d-flex justify-content-between">
                                        <Button variant="danger" onClick={() => excluir(item.id)}>Excluir</Button>
                                        <Button variant="warning" onClick={() => editar(item.id)}>Editar</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedStore ? selectedStore.title : ''}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedStore && (
                        <>
                            <img src={selectedStore.image} alt="Imagem da Loja" style={{ width: '100%', height: 'auto' }} />
                            <h5>Sobre:</h5>
                            <p>{selectedStore.about}</p>
                            <p><FaMapMarkerAlt /> <strong>Endereço:</strong> {selectedStore.address} {selectedStore.complement && `- ${selectedStore.complement}`} {selectedStore.number && `- ${selectedStore.number}`}</p>
                            <p><strong>Serviços:</strong> {selectedStore.services}</p>
                            <p><strong>Telefone:</strong> {selectedStore.phone}</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showConfirmModal} onHide={handleCancelDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Você tem certeza que deseja excluir esta loja?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelDelete}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
            <Footer />

        </>
    );
};

export default StoreListPage;
