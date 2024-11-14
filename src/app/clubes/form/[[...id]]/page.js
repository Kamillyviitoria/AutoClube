"use client";

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
import { validateRequiredFields } from '@/app/validators/ClubeValidator';
import { mask } from "remask";

export default function Page({ params }) {
  const route = useRouter();
  const [clubes, setclubes] = useState([]);
  const [clube, setclube] = useState({ title: '', address: '', phone: '', image: '' });
  const id = params?.id;

  const { register, handleSubmit, setValue, reset, watch, formState: { errors }, setError } = useForm();

  useEffect(() => {
    const clubesStorage = JSON.parse(localStorage.getItem('clubes')) || [];
    setclubes(clubesStorage);
    const dados = clubesStorage.find(item => item.id == id);
    reset(dados || { title: '', address: '', phone: '', image: '' });
    setclube(dados || {});
  }, [id, reset]);

  const salvar = (dados) => {
    const requiredError = validateRequiredFields(dados);
    if (requiredError) {
      alert(requiredError);
      return;
    }

    if (clube.id) {
      const index = clubes.findIndex(item => item.id === clube.id);
      if (index !== -1) {
        clubes[index] = { ...clubes[index], ...dados };
      }
    } else {
      dados.id = v4();
      clubes.push(dados);
    }

    localStorage.setItem('clubes', JSON.stringify(clubes));
    route.push('/clubes');
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue('image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhoneChange = (event) => {
    const value = event.target.value;
    const maskedValue = mask(value, "(99) 99999-9999");
    setValue('phone', maskedValue);
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
          <div className="d-flex justify-content-center align-items-center my-3 texto-custom">
            <h2 style={{ color: 'white' }}>
              {clube.id ? 'Editar clube' : 'Criar Novo Clube'}
            </h2>
          </div>
          <Form className="my-3" onSubmit={handleSubmit(salvar)} autoComplete="off">
            <Row>
              <Col>
                <Form.Group as={Row} className="mb-4">
                  <Form.Label column sm="2" htmlFor="title" style={{ color: 'white' }}><b>Nome:</b></Form.Label>
                  <Col sm="10">
                    <Form.Control
                      id="title"
                      type="text"
                      {...register("title")}
                      autoComplete="off"
                    />
                    {errors.title && <p className="text-danger">{errors.title.message}</p>}
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-4">
                  <Form.Label column sm="2" htmlFor="address" style={{ color: 'white' }}><b>Localidade:</b></Form.Label>
                  <Col sm="10">
                    <Form.Control
                      id="address"
                      type="text"
                      {...register("address")}
                      autoComplete="off"
                    />
                    {errors.address && <p className="text-danger">{errors.address.message}</p>}
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-4">
                  <Form.Label column sm="2" htmlFor="phone" style={{ color: 'white' }}><b>Telefone:</b></Form.Label>
                  <Col sm="10">
                    <Form.Control
                      id="phone"
                      type="text"
                      {...register("phone")}
                      onChange={handlePhoneChange}
                      autoComplete="off"
                    />
                    {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
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
                      autoComplete="off"
                    />
                    {errors.image && <p className="text-danger">{errors.image.message}</p>}
                  </Col>
                </Form.Group>

                {clube.image && (
                  <Row>
                    <Col className="text-center">
                      <Image 
                        src={clube.image} 
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
              <Link href={'/clubes'} className="btn btn-danger ms-2">
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
