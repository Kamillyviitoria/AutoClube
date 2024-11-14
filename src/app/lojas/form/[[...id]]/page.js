'use client';

import React, { useEffect, useState } from 'react';
import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";
import Image from 'next/image';
import { mask, unmask } from "remask";
import { validateRequiredFields, validateCep, validatePhone } from '@/app/validators/LojaValidator';

export default function Page({ params }) {
    const route = useRouter();
    const [lojas, setLojas] = useState([]);
    const [loja, setLoja] = useState({ title: '', cep: '', address: '', phone: '', services: '', image: '' });
    const id = params?.id;

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const lojasStorage = JSON.parse(localStorage.getItem('lojas')) || [];
        setLojas(lojasStorage);
        const dados = lojasStorage.find(item => item.id == id);
        const lojaData = dados || { title: '', cep: '', address: '', phone: '', services: '', image: '' };
        reset(lojaData);
        setLoja(lojaData);
        setImagePreview(lojaData.image || null);
    }, [id, reset]);

    const buscarEndereco = async (cep) => {
        if (cep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();
                if (!data.erro) {
                    setValue('address', data.logradouro);
                    setValue('complement', '');
                    setValue('number', '');
                } else {
                    alert("CEP não encontrado!");
                }
            } catch (error) {
                console.error("Erro ao buscar o CEP:", error);
            }
        }
    };

    const salvar = (dados) => {
        const requiredError = validateRequiredFields(dados);
        if (requiredError) {
            alert(requiredError);
            return;
        }

        const cepError = validateCep(dados.cep);
        if (cepError) {
            alert(cepError);
            return;
        }

        const phoneError = validatePhone(dados.phone);
        if (phoneError) {
            alert(phoneError);
            return;
        }

        if (loja.id) {
            const index = lojas.findIndex(item => item.id === loja.id);
            if (index !== -1) {
                lojas[index] = { ...lojas[index], ...dados };
            }
        } else {
            dados.id = v4();
            lojas.push(dados);
        }
        localStorage.setItem('lojas', JSON.stringify(lojas));
        route.push('/lojas');
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setValue('image', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePhoneChange = (e) => {
        const maskedPhone = mask(e.target.value, "(99) 99999-9999");
        setValue('phone', maskedPhone);
        setLoja((prev) => ({ ...prev, phone: maskedPhone }));
    };

    const handleCepChange = (e) => {
        const maskedCep = mask(e.target.value, "99999-999");
        setValue('cep', maskedCep);
        setLoja((prev) => ({ ...prev, cep: maskedCep }));
        buscarEndereco(unmask(maskedCep));
    };

    return (
        <>
            <Header />
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100vh',
                    backgroundImage: "url('/imagens/bugatti.jpg')", 
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Container
                    style={{
                        backgroundColor: 'rgba(64, 64, 64, 0.9)', 
                        padding: '20px',
                        borderRadius: '8px',
                        maxWidth: '600px',
                        width: '100%',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    <div className="d-flex justify-content-center align-items-center my-3 texto-custom">
                        <h2 style={{ color: 'white' }}>
                            {loja.id ? 'Editar Loja' : 'Criar Nova Loja'}
                        </h2>
                    </div>

                    <Form className="my-3" onSubmit={handleSubmit(salvar)} autoComplete="on">
                        <Row>
                            <Col>
                                <Form.Group as={Row} className="mb-4">
                                    <Form.Label column sm="2" htmlFor="title" style={{ color: 'white' }}><b>Nome:</b></Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            id="title"
                                            type="text"
                                            autoComplete="organization"
                                            {...register("title", { required: "O nome é obrigatório" })}
                                        />
                                        {errors.title && <span className="text-danger">{errors.title.message}</span>}
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-4">
                                    <Form.Label column sm="2" htmlFor="cep" style={{ color: 'white' }}><b>CEP:</b></Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            id="cep"
                                            type="text"
                                            autoComplete="postal-code"
                                            value={loja.cep || ''}
                                            onChange={handleCepChange}
                                        />
                                        {errors.cep && <span className="text-danger">{errors.cep.message}</span>}
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-4">
                                    <Form.Label column sm="2" htmlFor="address" style={{ color: 'white' }}><b>Endereço:</b></Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            id="address"
                                            type="text"
                                            autoComplete="address-line1"
                                            {...register("address", { required: "O endereço é obrigatório" })}
                                            readOnly
                                        />
                                        {errors.address && <span className="text-danger">{errors.address.message}</span>}
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-4">
                                    <Form.Label column sm="2" htmlFor="phone" style={{ color: 'white' }}><b>Telefone:</b></Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            id="phone"
                                            type="text"
                                            autoComplete="tel"
                                            value={loja.phone || ''}
                                            onChange={handlePhoneChange}
                                        />
                                        {errors.phone && <span className="text-danger">{errors.phone.message}</span>}
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-4">
                                    <Form.Label column sm="2" htmlFor="services" style={{ color: 'white' }}><b>Serviços:</b></Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            id="services"
                                            as="textarea"
                                            autoComplete="off"
                                            {...register("services", { required: "Os serviços são obrigatórios" })}
                                            rows={3}
                                        />
                                        {errors.services && <span className="text-danger">{errors.services.message}</span>}
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-4">
                                    <Form.Label column sm="2" htmlFor="image" style={{ color: 'white' }}><b>Imagem:</b></Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </Col>
                                </Form.Group>

                                {imagePreview && (
                                    <Row>
                                        <Col className="text-center">
                                            <Image
                                                src={imagePreview}
                                                alt="Preview da imagem"
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
                            <Link href={'/lojas'} className="btn btn-danger ms-2">
                                <MdOutlineArrowBack /> Voltar
                            </Link>
                        </div>
                    </Form>
                </Container>
            </div>
            <Footer />
        </>
    );
}
