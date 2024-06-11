import { useEffect,useState } from 'react';
import './App.css';
import Icons from './components/Icons';

const App = () => {
  const [search, setSearch] = useState('Barcelona');
  const [values, setValues] = useState('');
  const [icon, setIcon] = useState('');

  const API_KEY = `https://api.openweathermap.org/data/2.5/weather?q=${search}&lang=es&units=metric&appid=c89924c930c6330b069a71e50c7aeab1`;
  const getData = async () => {
      await fetch(API_KEY)
          .then(response => response.json())
          .then(data => {
              if (data.cod >= 400) {
                  setValues(false);
              } else {
                  setIcon(data.weather[0].main);
                  setValues(data);
              }
          })
          .catch(error => {
              console.log(error);
          });
  };
  useEffect(() => {
      getData();
  }, [search]);

  const handleSearch = (e) => {
      if (e.key === 'Enter') {
          setSearch(e.target.value);
      }
  };
       return (
            <>
              <div>
                  <h1 className="Titulo"><strong>Clima</strong></h1> 
              <div className="Buscador">
                  <input
                      onKeyDown={handleSearch}
                      type="text"
                      name="search"
                      placeholder="Buscar" 
                      aria-label="Search"
                  />
              </div>
          </div>
          <div className="Card">
              {values ? (
                  <div className="card-container">
                      <article>
                          <header><h1>{values.name}</h1></header>
                          <body>
                          <div className="icono-container">
                              <img className="icono" src={Icons(icon)} alt="icon-weather" />
                          </div>
                          </body>
                          <footer>
                              <h1>Temperatura: {values.main.temp}&deg;</h1>
                              <p className="Temp-max-min">Mínima: {values.main.temp_min}&deg; / Máxima: {values.main.temp_max}&deg;</p>
                              <p className="Humedad">Humedad: {values.main.humidity}</p>
                          </footer>
                      </article>
                  </div>
              ) : (
                  <>
                      <div className="Msj">
                          <h1 className="No-Encontrado">{"Ciudad no encontrada"}</h1> 
                      </div>
                  </>
              )}
          </div>
      </>
  );
};

export default App;
