 import {readFile} from "node:fs/promises";
import { EOL } from "node:os";

interface IWritable {
    write(menuStr : string): void;
    // use promise<void>

}

class HtmlWriter implements IWritable {
    async write () {
      
        // implement logic
    }
// need a write method for both
}

class TextWriter implements IWritable {
    async write () {
        
    }
}
 
 export class CsvMenuParser {
    public csvData: string[] = [];
     private constructor (data: string[]) {
        this.csvData = data
     }

     async writeMenu(writer: IWritable) {
        writer.write()
     }

    static async buildMenu (filename: string) {
        const data = await readFile(filename, "utf-8")
        return new CsvMenuParser(data.split(EOL));
    }

 }

async function main() {
    const menu = await  CsvMenuParser.buildMenu("menu.csv")
    console.log(menu.csvData)
}


main();

// writeMenu() write an html table
