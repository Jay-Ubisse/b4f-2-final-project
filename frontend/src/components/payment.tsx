import type { OrderProps } from "../types/order";

export const payments: OrderProps[] = [
    

    {
        orderId: "12345",
        customerName: "Albertina",
        items: [
            { itemId: "item1", quantity: 2, price: 50 },
            { itemId: "item2", quantity: 1, price: 100 }
        ],
        totalAmount: 200,
        orderDate: "2023-10-01",
        status: "pending",
        shippingAddress: {
            country: "africa",
            city: "Com Almorio"
        }
    },
    {
        orderId: "67890",
        customerName: "Almorio Adolfo",
        items: [
            { itemId: "item3", quantity: 1, price: 75 },
            { itemId: "item4", quantity: 3, price: 25 }
        ],
        totalAmount: 150,
        orderDate: "2023-10-02",
        status: "shipped",
        shippingAddress: {
            country: "Maputo",
            city: "Com Albertina"
        }
    }
]