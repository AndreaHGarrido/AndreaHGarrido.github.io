"use client"; 

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListaBanco = () => {
  const [banks, setBanks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBanks, setFilteredBanks] = useState([]);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get('https://dev.obtenmas.com/catom/api/challenge/banks');
        setBanks(response.data);
        setFilteredBanks(response.data); // Inicialmente, la lista filtrada es igual a la lista completa
      } catch (error) {
        console.error('Error fetching banks:', error);
      }
    };

    fetchBanks();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query === '') {
      setFilteredBanks(banks); // Si la búsqueda está vacía, muestra todos los bancos
    } else {
      const filtered = banks.filter(bank =>
        bank.bankName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBanks(filtered);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredBanks(banks); // Restablecer la lista completa de bancos
  };

  const deleteBank = (bankName) => {
    const updatedBanks = banks.filter(bank => bank.bankName !== bankName);
    setBanks(updatedBanks);
    setFilteredBanks(updatedBanks);
  };

  const sortBanksAlphabetically = () => {
    const sorted = [...filteredBanks].sort((a, b) => a.bankName.localeCompare(b.bankName));
    setFilteredBanks(sorted);
  };

  return (
    <div className="container">
      <div className="left-column">
        <h1 className='mb txt-white'>¿Sabías qué...?</h1>
        <h2 className='mb txt-white'>Etimológicamente, la palabra «banco» viene de la palabra italiana banco, 
          que quiere decir «escritorio». La usaban los banqueros judíos de Florencia 
          durante el Renacimiento, que hacían sus operaciones sobre una mesa que cubrían 
          con un mantel de color verde.</h2>
          <p className='mb txt-white'>
            Busca una tarjeta mediante el nombre de banco o ordena alfabeticamente las tarjetas.
          </p>
        <input
          type="text"
          placeholder= "Busqueda... "
          value={searchQuery}
          onChange={handleSearch}
        />
        <button onClick={clearSearch}>                
          <svg
          className='mt'
                  xmlns="http://www.w3.org/2000/svg"
                  height="16" viewBox="0 96 960 960" width="16" >
                  <path d="M261 936q-37 0-63.5-26.5T171 846V336h-90v-60h270v-30h258v30h270v60h-90v510q0 37-26.5 63.5T699 936H261Zm438-600H261v510h438V336Zm-288 453h60V396h-60v393Zm150 0h60V396h-60v393ZM261 336v510-510Z" />
                </svg>Limpiar</button>
        <button onClick={sortBanksAlphabetically}>
          <svg  className='mt'
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          viewBox="0 96 960 960"
          width="16"
          fill="currentColor"
        >
          <path d="M480 936 320 776l42-42 94 94V338l-94 94-42-42 160-160 160 160-42 42-94-94v490l94-94 42 42-160 160Z" />
        </svg>
        Ordenar Alfabéticamente</button>

      </div>


      <div className="right-column">
        <ul>
          {filteredBanks.map((bank) => (
            <div key={bank.bankName} className='credit-card'>
              <div className="card-bank-name">{bank.bankName}</div>
              <div className="chip"></div>
              <div className="card-number">{bank.description}</div>
              <div className="card-year">{bank.age} años</div>
              <a className="cardholder-name" href={bank.url} target="_blank" rel="noopener noreferrer">Visitar Sitio Web</a>
              
              <div className="delete-icon">
                <svg className="delete-icon-svg"
                onClick={() => deleteBank(bank.bankName)}
                  xmlns="http://www.w3.org/2000/svg"
                  height="28" viewBox="0 96 960 960" width="28" fill="white">
                  <path d="M261 936q-37 0-63.5-26.5T171 846V336h-90v-60h270v-30h258v30h270v60h-90v510q0 37-26.5 63.5T699 936H261Zm438-600H261v510h438V336Zm-288 453h60V396h-60v393Zm150 0h60V396h-60v393ZM261 336v510-510Z" />
                </svg>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListaBanco;
