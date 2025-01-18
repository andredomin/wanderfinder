import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../store/cartSlice';
import { RootState } from '../store/store'; 

interface CartModalProps {
  closeButton: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ closeButton }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  console.log(cartItems);
  const handleRemoveItem = (alojamientoId: number) => {
    dispatch(removeFromCart(alojamientoId));
  };



  return (
    <div className="cart-modal">
      <h3 className='titulo-reserva'>Carrito de Compras</h3>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item.alojamiento.id} className="cart-item">
              <h4 className='titulo-reserva'>{item.alojamiento.nombre}</h4>
              <p className='titulo-reserva'>Fecha: {item.fecha}</p>
              <p className='titulo-reserva'>Hora: {item.hora}</p>
              <p className='titulo-reserva'>Número de personas: {item.personas}</p>
              <button id='button-delete' onClick={() => handleRemoveItem(item.alojamiento.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className='titulo-reserva'>No hay productos en el carrito</p>
      )}
      <button className="closeModal" onClick={closeButton}>X</button>
    </div>
  );
};

export default CartModal;
