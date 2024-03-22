import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const path_root = process.env.NODE_ENV !== 'production'?path.resolve(__dirname, '..'):__dirname;
function LoadFrom(filename:string){
    return JSON.parse(fs.readFileSync(filename).toLocaleString())
}
export const version = LoadFrom(path.resolve(path_root,'package.json')).version as string