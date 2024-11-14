"use client";

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Carousel } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import Header from '../components/Header/Header';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';


const eventoslocais = [
    { id: 1, title: "Carbon Meet", date: "Sáb, 02 Nov 2024", time: "01:00", location: "Rua José Francisco Correia", image: "/imagens/carbon-meet.jpg", description: "Um encontro de entusiastas do carbono." },      
    { id: 2, title: "Overdrive - Encontro de Halloween", date: "Sex, 08 Nov 2024", time: "00:00", location: "Avenida Babita Camargos, 1295", image: "/imagens/imagem2.jpg", description: "Uma festa temática de Halloween." },
    { id: 3, title: "Expoauto", date: "Dom, 10 Nov 2024", time: "20:59", location: "Avenida Independência", image: "/imagens/imagem3.jpg", description: "Uma exposição de automóveis que vai apresentar as últimas novidades do setor." },
    { id: 4, title: "DRIFT PALMAS", date: "Sáb, 23 Nov 2024", time: "22:00", location: "Quadra 1504 Sul Al 29", image: "/imagens/imagem4.jpg", description: "Uma competição de drift com participação de pilotos renomados." },
    { id: 5, title: "CIRCUITO MEIDERUA", date: "Dom, 24 Nov 2024", time: "18:00", location: "Setor Placa das Mercedes Conjunt...", image: "/imagens/imagem5.jpg", description: "Um circuito de competições, com várias modalidades e prêmios." }
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

const EventListPage = () => {
    const router = useRouter();
    const [eventos, setEventos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [eventToDelete, setEventToDelete] = useState(null);

    useEffect(() => {
        const eventosStorage = JSON.parse(localStorage.getItem('evento')) || [];
        setEventos([...eventoslocais, ...eventosStorage]);
    }, []);

    const excluir = (id) => {
        setEventToDelete(id);
        setShowConfirmModal(true);
    };

    const handleConfirmDelete = () => {
        const dados = eventos.filter(item => item.id !== eventToDelete);
        localStorage.setItem('evento', JSON.stringify(dados));
        setEventos(dados);
        setShowConfirmModal(false);
        setEventToDelete(null);
    };

    const handleCancelDelete = () => {
        setShowConfirmModal(false);
        setEventToDelete(null);
    };

    const editar = (id) => {
        router.push(`/eventos/form/${id}`);
    };

    const handleImageClick = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
    };

    const handleReadMore = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
    };

    const formatarData = (data) => {
        const date = new Date(data);
        const dia = date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
        const diaDoMes = date.getDate();
        const mes = date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
        const ano = date.getFullYear();
        
        return `${dia.charAt(0).toUpperCase() + dia.slice(1)}, ${diaDoMes} de ${mes} de ${ano}`;
    };

    const formatarHora = (hora) => {
        return `às ${hora}`;
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
                                    src="/imagens/megadrift.jpg"
                                    alt="Imagem 1"
                                    style={{ height: '400px', objectFit: 'cover' }}
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="/imagens/expocarross.png"
                                    alt="Imagem 2"
                                    style={{ height: '400px', objectFit: 'cover' }}
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="/imagens/zero.jpg"
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
                        <Button variant="primary" href="/eventos/form">Criar Novo Evento</Button>
                    </Col>
                </Row>
                <Row>
                    {eventos.map((item) => (
                        <Col key={item.id} md={4}> 
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
                                        <strong>Descrição:</strong> {item.description.length > 100 ? `${item.description.slice(0, 100)}...` : item.description}
                                        {item.description.length > 100 && (
                                            <Button variant="link" onClick={() => handleReadMore(item)}> Ler mais</Button>
                                        )}
                                        <br />
                                        <FaCalendarAlt /> {formatarData(item.date)} <br />
                                        <FaClock /> {formatarHora(item.time)} <br />
                                        <FaMapMarkerAlt /> {item.location}
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
                    <Modal.Title>{selectedEvent ? selectedEvent.title : ''}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedEvent && (
                        <>
                            <img src={selectedEvent.image} alt="Imagem do Evento" style={{ width: '100%', height: 'auto' }} />
                            <h5>Descrição:</h5>
                            <p style={{ whiteSpace: 'normal', overflowWrap: 'break-word' }}>
                                {selectedEvent.description}
                            </p>
                            <p><strong>Data:</strong> {formatarData(selectedEvent.date)}</p>
                            <p><strong>Hora:</strong> {formatarHora(selectedEvent.time)}</p>
                            <p><strong>Local:</strong> {selectedEvent.location}</p>
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
                    <p>Você tem certeza que deseja excluir este evento?</p>
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

export default EventListPage;
