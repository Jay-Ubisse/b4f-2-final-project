type role = 'Admin' | 'Customer';
export interface userProps {
name:string,
email:string,
password:string,
role:role
}