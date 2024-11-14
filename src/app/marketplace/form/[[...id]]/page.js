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
import { mask } from "remask";
import { yupResolver } from '@hookform/resolvers/yup'; 
import MarkValidator from "@/app/validators/MarkValidator"; 

export default function Page({ params }) {
  const route = useRouter();
  const [marketplace, setMarketplace] = useState([]);
  const [marketplaces, setMarketplaces] = useState({
    title: '',
    address: '',
    phone: '',
    description: '',
    image: '',
    category: '',
    performance: '',
    desempenho: '',
    consumo: '',
    seguranca: '',
    conforto: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const id = params?.id;

  const { register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm({
    resolver: yupResolver(MarkValidator), 
  });

  const selectedCategory = watch("category");

  useEffect(() => {
    const marketplaceStorage = JSON.parse(localStorage.getItem('marketplace')) || [];
    setMarketplace(marketplaceStorage);
    const dados = marketplaceStorage.find(item => item.id == id);
    reset(dados || {
      title: '',
      price: '',
      address: '',
      phone: '',
      description: '',
      image: '',
      category: '',
      performance: '',
      desempenho: '',
      consumo: '',
      seguranca: '',
      conforto: ''
    });
    setMarketplaces(dados || {});
    setImagePreview(dados?.image || null);
  }, [id, reset]);

  const salvar = (dados) => {
    if (marketplaces.id) {
      const index = marketplace.findIndex(item => item.id === marketplaces.id);
      if (index !== -1) {
        marketplace[index] = { ...marketplace[index], ...dados };
      }
    } else {
      dados.id = v4();
      marketplace.push(dados);
    }
    localStorage.setItem('marketplace', JSON.stringify(marketplace));
    route.push('/marketplace');
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setImagePreview(imageUrl);
        setValue('image', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhoneChange = (event) => {
    const value = event.target.value;
    const maskedValue = mask(value, '(99) 99999-9999');
    setValue('phone', maskedValue);
  };

  const formatInput = (e) => {
    e.target.value = e.target.value.replace('.', ',');
    const value = parseFloat(e.target.value.replace(',', '.'));
    if (value > 10) e.target.value = "10";
    if (value < 0) e.target.value = "0";
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    const maskedValue = mask(value, 'R$ 999.999,99'); // Máscara de preço
    setValue('price', maskedValue);
  };

  return (
    <>
      <Header />
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 'auto', // Ajuste da altura para garantir que o conteúdo fique dentro da tela
          backgroundImage: "url('/imagens/bugatti.jpg')", // Ajuste o caminho da imagem
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh' // Garante que o fundo cubra toda a altura da tela
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
            zIndex: 1, // Garante que o conteúdo fique acima do fundo
          }}
        >
          <div className='d-flex justify-content-center align-items-center my-3 texto-custom'>
            <h2 style={{ color: 'white' }}>{marketplaces.id ? 'Editar Marketplace' : 'Criar Novo Anúncio'}</h2>
          </div>
          <Form className="my-3" onSubmit={handleSubmit(salvar)} autoComplete="off">
            <Row>
              <Col>

                <Form.Group as={Row} className="mb-4">
                  <Form.Label column sm="2" htmlFor="title"><b>Nome:</b></Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="text"
                      id="title"
                      name="title"
                      {...register("title")}
                      autoComplete="name"
                    />
                    {errors.title && <p className="text-danger">{errors.title.message}</p>}
                  </Col>
                </Form.Group>

                {/* Preço */}
                <Form.Group as={Row} className="mb-4">
                  <Form.Label column sm="2" htmlFor="price"><b>Preço:</b></Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="text"
                      id="price"
                      name="price"
                      {...register("price")}
                      onChange={handlePriceChange} // Aplica a máscara ao alterar o campo
                      autoComplete="off"
                    />
                  {errors.price && <p className="text-danger">{errors.price.message}</p>}
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-4">
                  <Form.Label column sm="2" htmlFor="address"><b>Localidade:</b></Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="text"
                      id="address"
                      name="address"
                      {...register("address")}
                      autoComplete="address"
                    />
                    {errors.address && <p className="text-danger">{errors.address.message}</p>}
                    </Col>
                  </Form.Group>

                <Form.Group as={Row} className="mb-4">
                  <Form.Label column sm="2" htmlFor="phone"><b>Telefone:</b></Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="text"
                      id="phone"
                      name="phone"
                      {...register("phone")}
                      onChange={handlePhoneChange}
                      autoComplete="tel"
                    />
                    {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
                    </Col>
                  </Form.Group>

                <Form.Group as={Row} className="mb-4">
                  <Form.Label column sm="2" htmlFor="description"><b>Descrição:</b></Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="text"
                      id="description"
                      name="description"
                      {...register("description")}
                      autoComplete="description"
                    />
                    {errors.description && <p className="text-danger">{errors.description.message}</p>}
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-4">
                  <Form.Label column sm="2" htmlFor="category"><b>Categoria:</b></Form.Label>
                  <Col sm="10">
                    <Form.Control
                      as="select"
                      id="category"
                      name="category"
                      {...register("category")}
                      autoComplete="off"
                    >
                      <option value="">Escolha uma categoria</option>
                      <option value="carro">Carro</option>
                      <option value="moto">Moto</option>
                      <option value="outros">Outros</option>
                    </Form.Control>
                    {errors.category && <p className="text-danger">{errors.category.message}</p>}
                  </Col>
                </Form.Group>

                {(selectedCategory === 'carro' || selectedCategory === 'moto') && (
                  <>
                    {['performance', 'desempenho', 'consumo', 'seguranca', 'conforto'].map((field, idx) => (
                      <Form.Group as={Row} className="mb-4" key={idx}>
                        <Form.Label column sm="2" htmlFor={field}><b>{field.charAt(0).toUpperCase() + field.slice(1)}:</b></Form.Label>
                        <Col sm="10">
                          <Form.Control
                            type="text"
                            id={field}
                            name={field}
                            {...register(field)}
                            placeholder="De 0 a 10"
                            onInput={formatInput}
                          />
                          {errors[field] && <p className="text-danger">{errors[field].message}</p>}
                        </Col>
                      </Form.Group>
                    ))}
                  </>
                )}

                <Form.Group as={Row} className="mb-4">
                  <Form.Label column sm="2" htmlFor="image"><b>Imagem:</b></Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    {errors.image && <p className="text-danger">{errors.image.message}</p>}
                  </Col>
                </Form.Group>

                {imagePreview && (
                  <Row>
                    <Col className="text-center">
                      <Image
                        src={imagePreview}
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
              <Link href={'/marketplace'} className="btn btn-danger ms-2">
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
