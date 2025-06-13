import type { OrderProps } from "../types/order";

import { columns } from "../components/orderItem";
import { payments } from "../components/payment"
import { DataTable } from "../components/datatable";


export const AdminPage = () => {
 
    const orders: OrderProps[] = payments;
    
    return (
        <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <DataTable
            columns={columns}
            data={orders}
            onRowClick={(row: any) => console.log("Row clicked:", row)}
        />
        </div>
    );
}

