import { create } from 'zustand';
import type { CartProduct } from '@/interfaces';

interface State {
    cart: CartProduct[];

    // Methods
    addProductToCart: (product: CartProduct) => void;
    // updateProductQuantity
    // removeProduct
}

export const useCartStore = create<State>()(
    (set, get) => ({
        cart: [],
        addProductToCart: (product: CartProduct) => {
            // Desestructuración
            const { cart } = get();
            console.log(cart);
            
            // 1.- Revisar si el producto existe en el carrito con la talla seleccionada. (some regresa true o false y ya no continua):
            const productInCart = cart.some(
                (item) => (item.id === product.id && item.size === product.size)
            );
            if (!productInCart) {
                set({
                    cart: [...cart, product]
                });
                return;
            }

            // 2.- Se que el producto existe por talla... tengo que incrementar
            const updatedCartProducts = cart.map( item => {
                if ( item.id === product.id && item.size === product.size ) {
                    return {...item, quantity: item.quantity +  product.quantity };
                }
                return item;
            });

            set({ cart: updatedCartProducts });

        }
    })
)
