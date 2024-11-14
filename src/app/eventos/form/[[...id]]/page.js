
"use client";
import React, { useEffect, useState } from 'react';
import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import eventValidator from "@/app/validators/EventoValidator";

export default function Page({ params }) {
    const route = useRouter();
    const [eventos, setEventos] = useState([]);
    const [evento, setEvento] = useState({ title: '', date: '', time: '', location: '', image: '', description: '' });
    const id = params?.id;

    useEffect(() => {
        const eventosStorage = JSON.parse(localStorage.getItem('evento')) || [];
        setEventos(eventosStorage);
        const dados = eventosStorage.find(item => item.id == id);
        setEvento(dados || { title: '', date: '', time: '', location: '', image: '', description: '' });
    }, [id]);

    const salvar = (dados) => {
        if (evento.id) {
            Object.assign(evento, dados);
        } else {
            dados.id = v4();
            eventos.push(dados);
        }
        localStorage.setItem('evento', JSON.stringify(eventos));
        route.push('/eventos');
    };

    const handleFileChange = (event, setFieldValue) => {
        const file = event.currentTarget.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFieldValue('image', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <Header />
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100vh',
                    backgroundImage: "url('/imagens/bugatti.jpg')", // Ajuste o caminho da imagem
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Container
                    style={{
                        backgroundColor: 'rgba(64, 64, 64, 0.9)', // Cinza escuro com opacidade
                        padding: '20px',
                        borderRadius: '8px',
                        maxWidth: '600px',
                        width: '100%',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    <div className='d-flex justify-content-center align-items-center my-3 texto-custom'>
                    <h2 style={{ color: 'white' }}>
                    {evento.id ? 'Editar Evento' : 'Criar Novo Evento'}
                    </h2>
                    </div>
                    <Formik
                        initialValues={evento}
                        enableReinitialize
                        validationSchema={eventValidator}
                        onSubmit={values => salvar(values)}
                    >
                        {({ values, handleChange, handleSubmit, setFieldValue, errors, touched }) => (
                            <Form className="my-3" onSubmit={handleSubmit}>
                                {/* Campos do formulário (mantidos como no seu código original) */}
                                <Row>
                                    <Col>
                                        <Form.Group as={Row} className="mb-4">
                                        <Form.Label column sm="2" htmlFor="title" style={{ color: 'white' }}><b>Nome do Evento:</b></Form.Label>
                                        <Col sm="10">
                                                <Form.Control
                                                    type="text"
                                                    name="title"
                                                    value={values.title}
                                                    onChange={handleChange}
                                                    id="title"
                                                    style={{
                                                        backgroundColor: 'rgba(128, 128, 128, 0.9)', // Cinza médio com opacidade
                                                        color: 'white' // Texto branco
                                                    }}
                                                />
                                                {errors.title && touched.title && <div className="text-danger">{errors.title}</div>}
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-4">
                                            <Form.Label column sm="2" htmlFor="date" style={{ color: 'white' }}><b>Data:</b></Form.Label>
                                            <Col sm="10">
                                                <DatePicker
                                                    selected={values.date ? new Date(values.date) : null}
                                                    onChange={(date) => setFieldValue('date', date)}
                                                    dateFormat="yyyy/MM/dd"
                                                    className="form-control"
                                                    placeholderText="Select a date"
                                                    id="date"
                                                    style={{
                                                        backgroundColor: 'rgba(128, 128, 128, 0.9)', // Cinza médio com opacidade
                                                        color: 'white' // Texto branco
                                                    }}
                                                />
                                                {errors.date && touched.date && <div className="text-danger">{errors.date}</div>}
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-4">
                                            <Form.Label column sm="2" style={{ color: 'white' }}htmlFor="time"><b>Hora:</b></Form.Label>
                                            <Col sm="10">
                                                <Form.Control
                                                    type="time"
                                                    name="time"
                                                    value={values.time}
                                                    onChange={handleChange}
                                                    id="time"
                                                    style={{
                                                        backgroundColor: 'rgba(128, 128, 128, 0.9)', // Cinza médio com opacidade
                                                        color: 'white' // Texto branco
                                                    }}
                                                />
                                                {errors.time && touched.time && <div className="text-danger">{errors.time}</div>}
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-4">
                                            <Form.Label column sm="2" style={{ color: 'white' }}htmlFor="location"><b>Local:</b></Form.Label>
                                            <Col sm="10">
                                                <Form.Control
                                                    type="text"
                                                    name="location"
                                                    value={values.location}
                                                    onChange={handleChange}
                                                    id="location"
                                                    style={{
                                                        backgroundColor: 'rgba(128, 128, 128, 0.9)', // Cinza médio com opacidade
                                                        color: 'white' // Texto branco
                                                    }}
                                                />
                                                {errors.location && touched.location && <div className="text-danger">{errors.location}</div>}
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-4">
                                            <Form.Label column sm="2" style={{ color: 'white' }} htmlFor="description"><b>Descrição:</b></Form.Label>
                                            <Col sm="10">
                                                <Form.Control
                                                    as="textarea"
                                                    name="description"
                                                    rows={3}
                                                    value={values.description}
                                                    onChange={handleChange}
                                                    id="description"
                                                    style={{
                                                        backgroundColor: 'rgba(128, 128, 128, 0.9)', // Cinza médio com opacidade
                                                        color: 'white' // Texto branco
                                                    }}
                                                />
                                                {errors.description && touched.description && <div className="text-danger">{errors.description}</div>}
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-4">
                                            <Form.Label column sm="2" style={{ color: 'white' }} htmlFor="image"><b>Imagem:</b></Form.Label>
                                            <Col sm="10">
                                                <Form.Control
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(event) => handleFileChange(event, setFieldValue)}
                                                    id="image"
                                                    style={{
                                                        backgroundColor: 'rgba(128, 128, 128, 0.9)', // Cinza médio com opacidade
                                                        color: 'white' // Texto branco
                                                    }}
                                                />
                                                {errors.image && touched.image && <div className="text-danger">{errors.image}</div>}
                                            </Col>
                                        </Form.Group>
                                        
                                        {values.image && (
                                            <Row>
                                                <Col className="text-center">
                                                    <Image 
                                                        src={values.image} 
                                                        alt="Preview" 
                                                        layout="responsive"
                                                        width={500}
                                                        height={300}
                                                        style={{ objectFit: 'cover' }} 
                                                    />
                                                </Col>
                                            </Row>
                                        )}
                                    </Col>
                                </Row>

                                <div className="text-center">
                                    <Button type="submit" variant="success">
                                        <FaCheck /> Salvar
                                    </Button>
                                    <Link href={'/eventos'} className="btn btn-danger ms-2">
                                        <MdOutlineArrowBack /> Voltar
                                    </Link>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Container>
            </div>
            <Footer />
        </>
    );
}
