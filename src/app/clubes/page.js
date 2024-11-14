"use client";

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Carousel } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import Header from '../components/Header/Header';
import { FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import Footer from '../components/Footer/Footer';

const clubesLocais = [
    { id: '1', title: 'Zero500Club Cars', phone: '(61) 9876-5432', address: 'Ceilândia - Distrito Federal', image: '/imagens.clubes/zaro500.jpg' },
    { id: '2', title: 'Garage Nutallo', phone: '(61) 9823-4576', address: 'Taguatinga - Distrito Federal', image: '/imagens.clubes/GarageNutallo.jpg' },
    { id: '3', title: 'GARAGE CAR CLUB', phone: '(61) 9812-3456', address: 'Ceilândia - Distrito Federal', image: '/imagens.clubes/garage_car_club.jpg' },
    { id: '4', title: '3deze6Club', phone: '(61) 9875-2341', address: 'Taguatinga - Distrito Federal', image: '/imagens.clubes/3deze6club.jpg' },
    { id: '5', title: '070 club', phone: '(61) 9898-1122', address: 'Ceilândia - Distrito Federal', image: '/imagens.clubes/070club.jpg' },
    { id: '6', title: 'Golf Clube', phone: '(61) 9888-2233', address: 'Taguatinga - Distrito Federal', image: '/imagens.clubes/golf_clube.jpg' },
    { id: '7', title: 'MitClub DF', phone: '(61) 9845-6789', address: 'Ceilândia - Distrito Federal', image: '/imagens.clubes/mitclub_df.jpg' },
    { id: '8', title: 'Club golf e bora bsb', phone: '(61) 9823-4567', address: 'Taguatinga - Distrito Federal', image: '/imagens.clubes/golf_bora_bsb.jpg' },
    { id: '9', title: 'Clube Palio', phone: '(61) 9856-7890', address: 'Ceilândia - Distrito Federal', image: '/imagens.clubes/clube_palio.jpg' },
    { id: '10', title: 'Suave na Nave BSB', phone: '(61) 9867-5432', address: 'Taguatinga - Distrito Federal', image: '/imagens.clubes/suave_nave_bsb.jpg' },
    { id: '11', title: 'Jettaclub DF', phone: '(61) 9876-5432', address: 'Ceilândia - Distrito Federal', image: '/imagens.clubes/jettaclub_df.jpg' },
    { id: '12', title: 'Corsa club', phone: '(61) 9834-5678', address: 'Taguatinga - Distrito Federal', image: '/imagens.clubes/corsa_club.jpg' },
    { id: '13', title: 'VAGCulture', phone: '(61) 9888-3322', address: 'Ceilândia - Distrito Federal', image: '/imagens.clubes/vagculture.jpg' },
    { id: '14', title: 'Fixabscei', phone: '(61) 9811-2233', address: 'Taguatinga - Distrito Federal', image: '/imagens.clubes/fixabscei.jpg' },
    { id: '15', title: 'Brasília Exotics Club', phone: '(61) 9844-5566', address: 'Ceilândia - Distrito Federal', image: '/imagens.clubes/brasilia_exotics.jpg' },
    { id: '16', title: 'Punto Clube DF', phone: '(61) 9855-6677', address: 'Taguatinga - Distrito Federal', image: '/imagens.clubes/punto_clube_df.jpg' },
    { id: '17', title: 'Soboraclub', phone: '(61) 9866-7788', address: 'Ceilândia - Distrito Federal', image: '/imagens.clubes/soboraclub.jpg' },
    { id: '18', title: 'Mistura Feminina', phone: '(61) 9899-0011', address: 'Taguatinga - Distrito Federal', image: '/imagens.clubes/mistura_feminina.jpg' },
    { id: '19', title: 'Bsbaixos', phone: '(61) 9822-3344', address: 'Ceilândia - Distrito Federal', image: '/imagens.clubes/bsbaixos.jpg' },
    { id: '20', title: 'Mini Clube DF', phone: '(61) 9833-4455', address: 'Taguatinga - Distrito Federal', image: '/imagens.clubes/mini_clube_df.jpg' },
    { id: '21', title: 'Deusas do Asfalto', phone: '(61) 9833-4455', address: 'Taguatinga - Distrito Federal', image: '/imagens.clubes/deusasdoasfalto.jpg' },

   
];

const styles = {
    cardCustom: {
        width: '100%',
        height: '340px',
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
    const [clubes, setclubes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedStore, setSelectedStore] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [storeToDelete, setStoreToDelete] = useState(null);

    useEffect(() => {
        const clubesStorage = JSON.parse(localStorage.getItem('clubes')) || [];
        setclubes([...clubesLocais, ...clubesStorage]);
    }, []);

    const excluir = (id) => {
        setStoreToDelete(id);
        setShowConfirmModal(true);
    };

    const handleConfirmDelete = () => {
        const updatedclubes = clubes.filter(item => item.id !== storeToDelete);
        localStorage.setItem('clubes', JSON.stringify(updatedclubes));
        setclubes(updatedclubes);
        setShowConfirmModal(false);
        setStoreToDelete(null);
    };

    const handleCancelDelete = () => {
        setShowConfirmModal(false);
        setStoreToDelete(null);
    };

    const editar = (id) => {
        router.push(`/clubes/form/${id}`);
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
                                    src="/imagens/EXEMPLO4.JPG"
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
                        <Button variant="danger" href="/clubes/form">Criar Novo Clube</Button>
                    </Col>
                </Row>
                <Row>
                    {clubes.map((item) => (
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
