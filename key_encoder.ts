import { AESEncoder } from "@/utils/AESDecoder";
import APIkeys from './APIkeys.json'
import fs from "fs";

 // buffer

const key: string = "lif31up";
const buffer: object = {
	... APIkeys, keys: APIkeys.keys.map((APIkey: string)=> AESEncoder(APIkey, key))
}
const stringfiedBuffer  = JSON.stringify(buffer, null, 2);
fs.writeFile('./public/keys.json', stringfiedBuffer, ()=>{})