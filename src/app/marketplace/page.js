"use client";

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Carousel } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import Header from '../components/Header/Header';
import { FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const marketplaceLocais = [
    { id: '13', title: 'FORD FUSION 2010', price: 'R$ 40.000,00', phone: '(61) 98899-1202', address: 'Águas Claras', description: 'Carro quitado sem débitos.', image: '/imagens.marketplace/fusion.jpg' ,category: 'carro', performance: '9', desempenho: '9', consumo: '6', seguranca: '8', conforto: '8'  },
    { id: '14', title: 'Azera 3.0 2012', price: 'R$ 60.000,00', phone: '(61) 98899-1202', address: 'Águas Claras', description: 'Carro completo com teto solar, central multimídia com GPS e muito mais.', image: '/imagens.marketplace/azera.jpg' ,category: 'carro', performance: '9,2', desempenho: '9,1', consumo: '4', seguranca: '6', conforto: '8,8'  },
    { id: '15', title: 'Marea Turbo 2001', price: 'R$ 20.000,00', phone: '(61) 98899-1202', address: 'Taguatinga / DF', description: 'Veiculo muito original. Tudo pensado e feito para evitar quebras. ', image: '/imagens.marketplace/marea.jpg' ,category: 'carro', performance: '10', desempenho: '9', consumo: '7', seguranca: '5', conforto: '5'  },
    { id: '16', title: 'BMW X6', price: 'R$ 500.000,00', phone: '(61) 98899-1202', address: 'Águas Claras', description: ' Potência (cv) 340.', image: '/imagens.marketplace/x6.jpg' ,category: 'carro', performance: '9,9', desempenho: '9,9', consumo: '3', seguranca: '8', conforto: '9,5'  },
    { id: '1', title: 'Corsa Wagon 1.6', price: 'R$ 20.000,00', phone: '(61) 98899-1202', address: 'Ceilândia / DF', description: 'Vendo corsa wagon muito nova, completa. Rodas do Vectra CD novas.', image: '/imagens.marketplace/corsa_wagon.jpg' ,category: 'carro', performance: '6', desempenho: '6', consumo: '8', seguranca: '6', conforto: '5' },
    { id: '2', title: 'Omega 3.0', price: 'R$ 40.000,00', phone: '(61) 98899-1202', address: 'Brasília / DF', description: 'Se você está procurando uma cotação para fazer o seu seguro.', image: '/imagens.marketplace/omega.jpg' ,category: 'carro', performance: '8', desempenho: '7', consumo: '7', seguranca: '7', conforto: '7'  },
    { id: '3', title: 'Pick UP Corsa', price: 'R$ 45.000,00', phone: '(61) 98899-1202', address: 'Taguatinga / DF', description: 'Pick UP Corsa 2001 Suspensão revisada. Suspensão revisada. Branco, Motor 1.8.', image: '/imagens.marketplace/pickup_corsa.jpg' ,category: 'carro', performance: '7', desempenho: '6', consumo: '6', seguranca: '7', conforto: '6'  },
    { id: '5', title: 'Kia Sorento 3.5 V6', price: 'R$ 80.000,00', phone: '(61) 98899-1202', address: 'Vicente Pires / DF', description: 'Produto em excelente estado.', image: '/imagens.marketplace/sorento.jpg' ,category: 'carro', performance: '9', desempenho: '9', consumo: '5', seguranca: '8', conforto: '9'  },
    { id: '6', title: 'Montana Vulkanic', price: 'R$ 15.000,00', phone: '(61) 98899-1202', address: 'Ceilândia / DF', description: 'LEIA O ANÚNCIO PEGO TROCA. SOM CHAMAR MANTONA 1.4 ANO 12 SOM 16.', image: '/imagens.marketplace/montana_vulkanic.jpg' ,category: '6', performance: '6', desempenho: '6', consumo: '6', seguranca: '6', conforto: '6'  },
    { id: '8', title: 'Chevette L', price: 'R$ 30.000,00', phone: '(61) 98899-1202', address: 'Vicente Pires / DF', description: 'Chevette 87 Turbo para pessoas exigentes, carro com interior.', image: '/imagens.marketplace/chevette.jpg' ,category: 'carro', performance: '6', desempenho: '6', consumo: '6', seguranca: '6', conforto: '6'  },
    { id: '11', title: 'Honda Civic lx 2000', price: 'R$ 25.000,00', phone: '(61) 98899-1202', address: 'Águas Lindas de Goiás / GO', description: 'Vendo esse lindo Civic motor 1.6 VTEC Câmbio manual Carro top Com.', image: '/imagens.marketplace/honda.jpg' ,category: 'carro', performance: '8', desempenho: '8', consumo: '8', seguranca: '8', conforto: '8'  },
    { id: '12', title: 'Gol bola', price: 'R$ 12.000,00', phone: '(61) 98899-1202', address: 'Taguatinga / DF', description: 'Gol G2 1.8 a álcool, 97/98, 24 PAGOU DUT em branco Rodas novas e pneus.', image: '/imagens.marketplace/gol_bola.jpg' ,category: 'carro', performance: '5', desempenho: '5', consumo: '7', seguranca: '7', conforto: '5'  },
   
    
];

const styles = {
    cardCustom: {
        width: '100%',
        height: '400px',
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
    const [marketplace, setMarketplace] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedStore, setSelectedStore] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [storeToDelete, setStoreToDelete] = useState(null);

    useEffect(() => {
        const marketplaceStorage = JSON.parse(localStorage.getItem('marketplace')) || [];
        setMarketplace([...marketplaceLocais, ...marketplaceStorage]);
    }, []);

    const excluir = (id) => {
        setStoreToDelete(id);
        setShowConfirmModal(true);
    };

    const handleConfirmDelete = () => {
        const updatedMarketplace = marketplace.filter(item => item.id !== storeToDelete);
        localStorage.setItem('marketplace', JSON.stringify(updatedMarketplace));
        setMarketplace(updatedMarketplace);
        setShowConfirmModal(false);
        setStoreToDelete(null);
    };

    const handleCancelDelete = () => {
        setShowConfirmModal(false);
        setStoreToDelete(null);
    };

    const editar = (id) => {
        router.push(`/marketplace/form/${id}`);
    };

    const handleImageClick = (store) => {
        setSelectedStore({
            ...store,
            performance: parseFloat(store.performance || 0),
            desempenho: parseFloat(store.desempenho || 0),
            consumo: parseFloat(store.consumo || 0),
            seguranca: parseFloat(store.seguranca || 0),
            conforto: parseFloat(store.conforto || 0),
        });
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
            <Container>
                <Row className="mb-3">
                    <Col>
                        <Button variant="danger" href="/marketplace/form">Criar Novo Anúncio</Button>
                    </Col>
                </Row>
                <Row>
                    {marketplace.map((item) => (
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
                                        <FaMapMarkerAlt /> {item.address} <br />
                                        <i class="bi bi-tag-Filler">{item.price}</i>
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
                            <img src={selectedStore.image} alt="Imagem do Anúncio" style={{ width: '100%', height: 'auto' }} />
                            <h5>Sobre:</h5>
                            <p>{selectedStore.description}</p>
                            <p><FaMapMarkerAlt /> <strong>Endereço:</strong> {selectedStore.address}</p>
                            <p><strong>Telefone:</strong> {selectedStore.phone}</p>

                            {(selectedStore.category === 'carro' || selectedStore.category === 'moto') && (
                                <Radar
                                    data={{
                                        labels: ['Performance', 'Desempenho', 'Consumo', 'Segurança', 'Conforto'],
                                        datasets: [
                                            {
                                                label: 'Avaliação',
                                                data: [
                                                    selectedStore.performance,
                                                    selectedStore.desempenho,
                                                    selectedStore.consumo,
                                                    selectedStore.seguranca,
                                                    selectedStore.conforto
                                                ],
                                                backgroundColor: 'rgba(34, 202, 236, 0.2)',
                                                borderColor: 'rgba(34, 202, 236, 1)',
                                                borderWidth: 2,
                                            }
                                        ]
                                    }}
                                    options={{
                                        scales: {
                                            r: {
                                                min: 0,
                                                max: 10,
                                                ticks: { stepSize: 1 },
                                            }
                                        },
                                        responsive: true,
                                        maintainAspectRatio: true
                                    }}
                                />
                            )}
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
                    <p>Você tem certeza que deseja excluir este anúncio?</p>
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
        </>
    );
};

export default StoreListPage;
