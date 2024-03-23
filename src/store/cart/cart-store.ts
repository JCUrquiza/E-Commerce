import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartProduct } from '@/interfaces';

interface State {
    cart: CartProduct[];

    // Methods
    getTotalItems: () => number;
    addProductToCart: (product: CartProduct) => void;
    updateProductQuantity: (product: CartProduct, quantity: number) => void;
    removeProduct: (product: CartProduct) => void;
    clearCart: () => void;

    getSummaryInformation: () => {
        subTotal: number;
        tax: number;
        total: number;
        itemsInCart: number;
    };
}

export const useCartStore = create<State>()(

    persist(

        (set, get) => ({

            cart: [],

            getTotalItems: () => {
                const { cart } = get();
                return cart.reduce((total, item) => total + item.quantity, 0);
            },

            addProductToCart: (product: CartProduct) => {
                // Desestructuración
                const { cart } = get();
                
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
            },

            updateProductQuantity: (product: CartProduct, quantity: number) => {
                // Desestructuración
                const { cart } = get();
                const updatedCartProducts = cart.map( item => {
                    if ( item.id === product.id && item.size === product.size ) {
                        return {...item, quantity: quantity};
                    }
                    return item;
                });
                set({ cart: updatedCartProducts });  
            },

            removeProduct: (product: CartProduct) => {
                // Desestructuración
                const { cart } = get();
                const updatedCartProducts = cart.filter(
                    (item) => item.id !== product.id || item.size !== product.size
                );
                set({cart: updatedCartProducts});
            },

            getSummaryInformation: () => {
                // Desestructuración
                const { cart } = get();

                const subTotal = cart.reduce(
                    (subTotal, product) => (product.price * product.quantity) + subTotal,
                    0
                );

                const tax = subTotal * 0.15;
                const total = subTotal + tax;
                const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

                return {
                    subTotal, tax, total, itemsInCart
                }

            },

            clearCart: () => {
                set({cart : []})
            }

        })
        ,{
            name: 'shopping-cart',
        }
    )

)
