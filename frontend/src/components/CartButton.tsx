import { useState } from 'react';
import CartModal from './CartModal'; 

interface CartButtonProps {
  closeButton?: () => void;
}


const CartButton: React.FC<CartButtonProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={toggleModal} className="cart-button">
        🛒
      </button>

      {isModalOpen && <CartModal closeButton={closeModal} />}
    </div>
  );
};

export default CartButton;
