import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import CartButton from './CartButton';

const AlojamientosList: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();  
  const [alojamientos, setAlojamientos] = useState<Alojamiento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedAlojamiento, setSelectedAlojamiento] = useState<Alojamiento | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const today = new Date();
  const [selectedTime, setSelectedTime] = useState<string>(''); 
  const [numPeople, setNumPeople] = useState<number>(1);
  const navigate = useNavigate();

  interface Alojamiento {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    disponibilidad: boolean;
  }

  useEffect(() => {
    
    if (id) {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/alojamientos/${id}`)
      .then((response) => {
        setAlojamientos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener alojamientos:', error);
        setLoading(false);
      });
    }
  }, [id]);

  const openModal = (alojamiento: Alojamiento) => {
    setSelectedAlojamiento(alojamiento);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAlojamiento(null);
    setSelectedDate(null);
    setSelectedTime('');
  };

  const closeButton = () => {
    console.log("Cerrando modal...");
    setIsModalOpen(false);
  };

  const handleAddToCart = () => {
    if (selectedAlojamiento && selectedDate && numPeople && selectedTime ) {
      dispatch(
        addToCart({
          alojamiento: selectedAlojamiento,
          fecha: selectedDate.toISOString().split('T')[0],
          hora: selectedTime,
          personas: numPeople
        })
      );
      closeModal();
    } else {
      alert('Por favor selecciona una fecha y una hora.');
    }
  };

  const goBack = () => {
    navigate(`/`);
  };

  if (loading) {
    return <div>Cargando alojamientos...</div>;
  }

  return (
      <>
        <CartButton closeButton={closeButton} />
        <h2 id='alojamiento-title'>Alojamientos en este destino</h2>
        {alojamientos.length > 0 ? (
          <>
            <div className="alojamiento-container">
            <ul>
              {alojamientos.map((alojamiento) => (
                <li key={alojamiento.id}>
                  <span className='data_container'>
                  <span className='category_data'>Nombre: </span>
                  <span className='hotel__label'>{alojamiento.nombre}</span>
                  <span className='category_data'>Descripción: </span>
                  <span className='hotel__label'>{alojamiento.descripcion}</span>
                  <span className='category_data'>Precio: </span>
                  <span className='hotel__label'>€{alojamiento.precio}</span>
                  <span className='category_data'>Disponibilidad: </span>
                  <span className='hotel__label'>
                    {alojamiento.disponibilidad ? "Disponible" : "No disponible"}
                  </span>
                  </span>
                  {alojamiento.disponibilidad && (
                    <button onClick={() => openModal(alojamiento)}>Añadir</button>
                  )}
                </li>
              ))}
            </ul>
            </div>
          </>
        ) : (
          <p>No se encontraron alojamientos para este destino.</p>
        )}
    <button className="backto-alojamientos" onClick={goBack}>Volver a Inicio</button>
    <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel='Reservar Alojamiento'
        ariaHideApp={false}
      >
        <h2 className='titulo-reserva'>Reservar {selectedAlojamiento?.nombre}</h2>
        <h3 className='titulo-reserva'>Fecha de reserva:</h3>
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => {
            if (date) {
              setSelectedDate(date);  
              const hours = date.getHours();  
              const minutes = date.getMinutes();  
              const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
              setSelectedTime(formattedTime);
            } else {
              setSelectedDate(null);
              setSelectedTime('');
            }
          }}
          dateFormat="yyyy-MM-dd HH:mm"
          minDate={today}
          showTimeSelect
          timeIntervals={15}
          timeCaption="Hora"
          placeholderText="Selecciona una fecha y hora"
        />

        <br />
        <br />
        <div>
            <label className='titulo-reserva' htmlFor="numPeople">Número de personas:</label>
            <br />
            
            <select
              id="numPeople"
              value={numPeople}
              onChange={(e) => setNumPeople(Number(e.target.value))}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
          </div>
        <br />
        <br />
        <button onClick={handleAddToCart}>Añadir al carrito</button>
        <button onClick={closeModal}>Cancelar</button>
      </Modal>
      
      </>
    );
  }  


export default AlojamientosList;
