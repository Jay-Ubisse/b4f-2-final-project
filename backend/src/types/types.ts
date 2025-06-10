type role = 'Admin' | 'Costumer';
export interface userProps {
name:string,
email:string,
password:string,
role:role
}