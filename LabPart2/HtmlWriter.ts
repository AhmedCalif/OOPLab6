import { writeFile } from 'fs/promises';
import { IWritable } from './IWritable';

interface MenuItem {
    type: string;
    name: string;
    quantity: string;
    price: string;
}

export class HtmlWriter implements IWritable {
    private filename: string;

    constructor(filename: string) {
        this.filename = filename;
    }

    async write(menuItems: MenuItem[]) {
        const htmlContent = this.generateHtml(menuItems);
        await writeFile(this.filename, htmlContent);
    }

    private generateHtml(menuItems: MenuItem[]): string {
        const uniqueMealTypes = [...new Set(menuItems.map(item => item.type))];
        let html = '';

        uniqueMealTypes.forEach((mealType) => {
            html += `
                <!DOCTYPE html>
                <html>
                <head>
                <title>${mealType} Menu</title>
                </head>
                <body>
                <table border="1">
                <tr><th colspan="3">****${mealType.toUpperCase()}****</th></tr>
                <tr><th>Price</th><th>Name</th><th>Quantity</th></tr>
            `;

            const itemsOfType = menuItems.filter(item => item.type === mealType);
            itemsOfType.forEach((item) => {
                html += `<tr><td>${item.price}</td><td>${item.name}</td><td>${item.quantity}</td></tr>`;
            });

            html += `
                </table>
                </body>
                </html>
            `;
        });

        return html;
    }
}
