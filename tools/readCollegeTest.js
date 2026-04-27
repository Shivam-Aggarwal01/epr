import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, '..', 'Backend', 'data', 'pu_colleges.json');
console.log('trying file:', file);
try{
  const raw = fs.readFileSync(file,'utf-8');
  const json = JSON.parse(raw);
  console.log('ok, keys:', Object.keys(json));
}catch(e){
  console.error('read error', e);
}
