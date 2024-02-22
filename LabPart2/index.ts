import { HtmlWriter } from "./HtmlWriter";
import { TextWriter } from "./TextWriter";
import { readFile, writeFile } from "node:fs/promises";
import { EOL } from "os";
import { IWritable } from "./IWritable";

interface MenuItems {
    type: string; 
    name: string; 
    quantity: string; 
    price: string
}

export class CsvMenuParser {
    private csvData: string[] = [];
    private menuItems: MenuItems[] = [];

    private constructor(data: string[], menuItems: MenuItems[]) {
        this.csvData = data;
        this.menuItems = menuItems;
    }

    static async buildMenu(filename: string): Promise<CsvMenuParser> {
        const data = await readFile(filename, 'utf8');
        const splitData = data.split(EOL);
        const menuItems = splitData.map((menu) => {
            const [mealType, mealName, mealQuantity, price] = menu.split(',');
            return { type: mealType, name: mealName, quantity: mealQuantity, price: price };
        });
        return new CsvMenuParser(splitData, menuItems);
    }

    async writeMenu(writer: IWritable) {
        await writer.write(this.menuItems);
    }
    getMenuItems(): MenuItems[] {
        return this.menuItems;
    }
}
async function main() {
    try {
        const csvFilePath: string = 'menu.csv';
        const parser: CsvMenuParser = await CsvMenuParser.buildMenu(csvFilePath);
        const menuItems: MenuItems[] = parser.getMenuItems();

        const htmlWriter: HtmlWriter = new HtmlWriter("menu.html");
        await htmlWriter.write(menuItems);

        const textWriter: TextWriter = new TextWriter("menu.txt");
        await textWriter.write(menuItems);
    } catch (err) {
        console.error('An error occurred:', err);
    }
}

main();




