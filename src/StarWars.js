import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Modal from "react-modal";
import starwars from './image/starwarsmodal.jpeg'


function StarwarsComponent() {

  const [records, setRecords] = useState([])
  const [paginaAnterior, setPaginaAnterior] = useState(null);
  const [paginaProximo, setPaginaProximo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modal, setOpenModal] = useState(false);

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

const openModal = (record) => {
  setRecords(record);
  setOpenModal(true);
} 
const closeModal = () => {
  setOpenModal(false);
}
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
                          <Modal 
                             style={{
                              overlay: {
                                backgroundColor: "rgba(0,0,0, 0.1)",
                                position: "fixed",
                                width: "100%",
                                height: "100%"
                              },
                              content: {
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                textAlign: "center",
                                marginTop: "200rem",
                                padding: "1rem 2rem"
                              },
                            }}
                            isOpen={modal}>
                              <div className='modalContainer'>
                                   <img src={starwars} alt='Starwars Logo'/>
                                   <div className='modalRight'>
                                       <button onClick={closeModal}>X</button>
                                       <div className='content'>
                                          <ul>
                                            {records.map((record, i) => {
                                              return (
                                                <ul key={i}>{record.name}</ul>
                                              )
                                            })}
                                          </ul>
                                       </div>
                                       </div>
                                </div>
                            </Modal> 
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