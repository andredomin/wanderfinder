
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Alojamiento {
  id: number;
  nombre: string;
  precio: number;
}

interface CartItem {
  alojamiento: Alojamiento;
  fecha: string;
  hora: string;
  personas: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.alojamiento.id !== action.payload);
    }
  }
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
