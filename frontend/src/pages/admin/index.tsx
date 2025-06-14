
import { DataTable } from "../../components/admin/adminDashBoard";
import { columns, data  } from "../../types/order";



export function AdminPage() {
    return (
        <div className="flex-row bg-gray-100 min-h-screen">
        
            <div className="container ">
                <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>
                <DataTable columns={columns} data={data} />
            
            </div>
        </div>
    )

}
