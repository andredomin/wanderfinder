import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Buscador from './Buscador';
import { useNavigate } from 'react-router-dom';
import CartButton from './CartButton';
interface Destino {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string[];
  ubicacion: string;
  imagenes: string[];
  precio: string;
}

const DestinosList: React.FC = () => {
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [priceFilter, setPriceFilter] = useState<string | null>(null);
  const [continentFilter, setContinentFilter] = useState<string | null>(null);


  const navigate = useNavigate();
  const handleDestino = (id: string) => {
    navigate(`/alojamientos/${id}`);
  };
  useEffect(() => {
    const fetchDestinos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/destinos');
        const data = response.data.map((destino: any) => ({
          ...destino,
          categoria: Array.isArray(destino.categoria)
            ? destino.categoria
            : JSON.parse(destino.categoria || '[]'),
          imagenes: Array.isArray(destino.imagenes)
            ? destino.imagenes
            : JSON.parse(destino.imagenes || '[]'),
          precio: destino.precio || 'Sin especificar',
        }));
        setDestinos(data);
      } catch (err) {
        console.error('Error al obtener destinos:', err);
        setError('Hubo un error al cargar los destinos. Por favor, intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchDestinos();
  }, []);

  if (loading) {
    return <div>Cargando destinos...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (destinos.length === 0) {
    return <div>No se encontraron destinos.</div>;
  }

  const filteredDestinos = destinos.filter((destino) => {
    const matchesSearch = destino.nombre.toLowerCase().startsWith(searchTerm.toLowerCase());
    const matchesPrice = priceFilter ? destino.precio === priceFilter : true;
    const matchesDestino = continentFilter === null || destino.ubicacion === continentFilter
    return matchesSearch && matchesPrice && matchesDestino;
  });
  



  return (
    <>
    <h1 id='logo'>WanderFinder.</h1>
    <CartButton />
      <Buscador
        searchTerm={searchTerm}
        onSearchChange={(term) => setSearchTerm(term)}
        onPriceFilterChange={setPriceFilter}
        onContinentFilterChange={(continent) => setContinentFilter(continent)}
      />
  <div className="container-listing">
    <div>
      <ul id='listing'>
        {filteredDestinos.map((destino) => (
          <li key={destino.id} onClick={() => handleDestino(destino.id)} style={{ marginBottom: '20px' }}>
            <h2>{destino.nombre}</h2>
            <p>{destino.descripcion}</p>
            <p><strong>Categorías:</strong> {destino.categoria.join(', ')}</p>
            <p><strong>Ubicación:</strong> {destino.ubicacion}</p>
            <p><strong>Precio:</strong> {destino.precio}</p>
            <div>
              {destino.imagenes.map((imagen, index) => (
                <img
                  key={index}
                  src={imagen}
                  alt={`${destino.nombre} - ${index + 1}`}
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
    </>
  );
};

export default DestinosList;
