import { writeFile } from 'fs/promises';
import { EOL } from 'os';
import { IWritable } from './IWritable';

interface MenuItem {
    type: string;
    name: string;
    quantity: string;
    price: string;
}

export class TextWriter implements IWritable {
    private filename: string;

    constructor(filename: string) {
        this.filename = filename;
    }

    async write(menuItems: MenuItem[]) {
        const formattedData = this.format(menuItems);
        await writeFile(this.filename, formattedData);
    }

    private format(menuItems: MenuItem[]): string {
        const formattedItems: string[] = [];

        const uniqueMealTypes = [...new Set(menuItems.map(item => item.type))];

        uniqueMealTypes.forEach((mealType) => {
            formattedItems.push(`****${mealType.toUpperCase()}**** ${EOL}`);
            const itemsOfType = menuItems.filter(item => item.type === mealType);
            itemsOfType.forEach((item) => {
                formattedItems.push(`${item.price} ${item.name} ${item.quantity} ${EOL}`);
            });
        });

        return formattedItems.join('');
    }
}
