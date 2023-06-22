import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

function StarwarsComponent() {

  const [column, setColum] = useState([])
  const [records, setRecords] = useState([])
  const [paginaAnterior, setPaginaAnterior] = useState(null);
  const [paginaProximo, setPaginaProximo] = useState(null);
  const [loading, setLoading] = useState(false);

//   useEffect(()=> {
//     fetch('https://swapi.dev/api/people').then(res => res.json()).then(data => {
//       const tableResults = ['name', 'height', 'mass', 'hair_color', 'skin_color', 'eye_color', 'birth_year']
//       setColum(tableResults)
//       setRecords(data.results)
//       setPaginaAnterior(data.previous);
//       setPaginaProximo(data.next);
//     });
//   }, []);
    useEffect(() => {
        setLoading(true)
        setTimeout(() =>{
          setLoading(false)
        }, 4000)
        fetch('https://swapi.dev/api/people').then(res => res.json()).then(data => {
            const tableResults = ['name', 'height', 'mass', 'hair_color', 'skin_color', 'eye_color', 'birth_year']
            setColum(tableResults)
            setRecords(data.results)
            setPaginaAnterior(data.previous);
            setPaginaProximo(data.next);
        });
    }, []);

  const carregarPaginaAnterior = () => {
    setLoading(true)
        setTimeout(() =>{
          setLoading(false)
        }, 3000)
    fetch(paginaAnterior)
    .then(res => res.json())
    .then(data => {
      setRecords(data.results)
      setPaginaAnterior(data.previous);
      setPaginaProximo(data.next);
    });
  };

  const carregarPaginaProximo = () => {
    setLoading(true)
        setTimeout(() =>{
          setLoading(false)
        }, 3000)
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
                        {column.map((c, i) => 
                        <th key={i}>{c}</th>
                        )}
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