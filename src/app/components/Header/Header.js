import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="border-bottom">
      <Container className="d-flex justify-content-between">
        {/* Logo */}
        <Link href="/" passHref>
          <Navbar.Brand className="d-flex align-items-center text-white">
            <Image src="https://www.autoclubes.com.br/logo.svg" height={50} alt="Logo" />
          </Navbar.Brand>
        </Link>

        <Nav className="me-auto">
          <Nav.Link href="/" active>Home</Nav.Link>
          <Nav.Link href="/eventos">Eventos</Nav.Link>
          <Nav.Link href="/lojas">Lojas</Nav.Link>
          <Nav.Link href="/clubes">Clubes</Nav.Link>
          <Nav.Link href="/marketplace">Marketplace</Nav.Link>
          <Nav.Link href="/car">Personalize Seu Carro</Nav.Link>
          <Nav.Link href="/car">Produtos</Nav.Link>

          
        </Nav>

        
      </Container>
    </Navbar>
  );
}

export default Header;
