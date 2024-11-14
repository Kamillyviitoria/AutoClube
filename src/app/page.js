"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="page">
      <Image
        src="/car.png"
        alt="Imagem de fundo Auto Clubes"
        layout="fill"
        className="backgroundImage"
        priority
      />


      <div className="footerIcons">
        
          <Link href="/eventos" className="footerLink">
            <div className="iconContainer">
              <span>EVENTOS</span>
            </div>
          </Link>
          <Link href="/lojas" className="footerLink">
            <div className="iconContainer">
              <span>LOJAS</span>
            </div>
          </Link>
          <Link href="/clubes" className="footerLink">
            <div className="iconContainer">
              <span>CLUBES</span>
            </div>
          </Link>
          <Link href="/marketplace" className="footerLink">
            <div className="iconContainer">
              <span>MARKETPLACE</span>
            </div>
          </Link>
          <Link href="/produtos" className="footerLink">
            <div className="iconContainer">
              <span>PRODUTOS</span>
            </div>
          </Link>
          <Link href="/car  " className="footerLink">
            <div className="iconContainer">
              <span>MONTE O SEU</span>
            </div>
          </Link>
        
      </div>

      <style jsx>{`
        .backgroundImage {
          position: fixed; 
          top: 0;
          left: 0;
          width: 100vw; 
          height: 100vh; 
          object-fit: cover; 
          z-index: -1; 
        }

        .mainContent {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh; 
          color: white; 
          text-align: center;
          padding: 20px;
        }

        .footerIcons {
          position: fixed;
          bottom: 20px;
          width: 100%;
          display: flex;
          justify-content: center;
          gap: 20px;
          z-index: 1;
        }

        .footerLink {
          text-decoration: none;
          color: white;
        }

        .iconContainer {
          background-color: black;
          border-radius: 20px;
          padding: 10px 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 150px;
          color: white;
        }

        .iconImage {
          width: 30px;
          height: 30px;
          margin-bottom: 10px;
        }

        .iconContainer span {
          font-weight: bold;
          margin-bottom: 5px;
        }

        .iconContainer p {
       padding: 15px 30px; /* Aumenta o espaço interno */
  background-color: #007BFF; /* Cor de fundo */
  color: white; /* Cor do texto */
  border-radius: 5px; /* Cantos arredondados */
  text-align: center; /* Centraliza o texto */
  cursor: pointer; /* Muda o cursor para indicar que é clicável */
  display: inline-block; /* Permite que o botão tenha dimensões */
  font-size: 30px; /* Aumenta o tamanho da fonte */
  margin: 5px; /* Espaçamento entre os botões, se houver mais de um */
}
      `}</style>
    </div>
  );
}
