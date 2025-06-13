import { useCart } from "../contexts/cartContext";

export const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Meu Carrinho</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Seu carrinho está vazio.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="border p-4 flex justify-between items-center">
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                {/* Se quiser mostrar a imagem */}
                {/* <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover mb-2" /> */}
                <p>Preço: ${item.price.toFixed(2)}</p>
                <p>
                  Quantidade: 
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="mx-2 px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="mx-2 px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </p>
                <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <button
                className="text-red-500"
                onClick={() => removeFromCart(item._id)}
              >
                Remover
              </button>
            </div>
          ))}
          <div className="text-right font-bold text-xl">
            Total: ${total.toFixed(2)}
          </div>
          <button
            onClick={clearCart}
            className="bg-red-600 text-white px-4 py-2 rounded mt-4"
          >
            Limpar Carrinho
          </button>
        </div>
      )}
    </div>
  );
};
