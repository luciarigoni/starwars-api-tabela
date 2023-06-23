import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Modal from "./Modal";

function StarwarsComponent() {

  const [records, setRecords] = useState([])
  const [paginaAnterior, setPaginaAnterior] = useState(null);
  const [paginaProximo, setPaginaProximo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  function findData() {
      fetch('https://swapi.dev/api/people').then(res => res.json()).then(data => {
      setRecords(data.results)
      setPaginaAnterior(data.previous);
      setPaginaProximo(data.next);
  });
  }

  function loadingPage() {
    setLoading(true)
    setTimeout(() =>{
      setLoading(false)
    }, 4000)
  }

    useEffect(() => {
        loadingPage()
        findData()
    }, []);

  const carregarPaginaAnterior = () => {
    loadingPage()
    fetch(paginaAnterior)
    .then(res => res.json())
    .then(data => {
      setRecords(data.results)
      setPaginaAnterior(data.previous);
      setPaginaProximo(data.next);
    });
  };

  const carregarPaginaProximo = () => {
    loadingPage()
    fetch(paginaProximo)
    .then(res => res.json())
    .then(data => {
      setRecords(data.results)
      setPaginaAnterior(data.previous);
      setPaginaProximo(data.next);
  });
};
  return (
    <div>
        <h1 className="title">Starwars</h1>
        {
          loading?
          <ClipLoader color={'#FFF'} loading={loading} size={100} aria-label="Loading Spinner" data-testid="loader"/>
          :
          <div>
          <table className="custom-table">
                <thead>
                    <tr>
                      <th>Name</th>
                      <th>Height</th>
                      <th>Mass</th>
                      <th>Hair color</th>
                      <th>Skin color</th>
                      <th>Eye color</th>
                      <th>Birth year</th>
                      <th>Info</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record, i) => <tr key={i}>
                        <td>{record.name}</td>
                        <td>{record.height}</td>
                        <td>{record.mass}</td>
                        <td>{record.hair_color}</td>
                        <td>{record.skin_color}</td>
                        <td>{record.eye_color}</td>
                        <td>{record.birth_year}</td>
                        <td>
                          <button className="modalBtn" onClick={()=> setOpenModal(true)}>More info</button>
                          <Modal open={openModal} onClose={() => setOpenModal(false)} dadosModal={record.homeworld}/> 
                        </td>
                    </tr>
                    )}
                    <br></br>
                    <button className="botao" onClick={carregarPaginaAnterior} disabled={!paginaAnterior}>Anterior</button>
                    <button className="botao" onClick={carregarPaginaProximo} disabled={!paginaProximo}>Próximo</button>
                </tbody>
            </table>
          </div>
        }
    </div>
  );
}

export default StarwarsComponent;