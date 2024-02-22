interface MenuItems {
    type: string; 
    name: string; 
    quantity: string; 
    price: string
}

export interface IWritable {
    write(content: MenuItems[]): Promise<void>;
}