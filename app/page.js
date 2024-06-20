"use client";

import Head from 'next/head';
import ListaBanco from '../components/ListaBanco';
import '../styles/globals.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Bancos App</title>
        <meta name="description" content="Lista de bancos" />
      </Head>
      <main>
        <h1 className='txt-white txt-center'>Lista de Bancos</h1>        
        <div className="background">
          <div className="circle-small"></div>
          <div className="circle-medium"></div>
          <div className="circle-large"></div>
          <ListaBanco />
        </div>
      </main>
    </>
  );
}
