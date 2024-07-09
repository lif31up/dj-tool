import CryptoJS from "crypto-js";

export default function AESDecoder(block: string, key: string): any {
  let encoded: string = "none";
  if (block && key) {
    const bytes: CryptoJS.lib.WordArray = CryptoJS.AES.decrypt(block, key);
    encoded = bytes.toString(CryptoJS.enc.Utf8);
  }
  return encoded;
} // AESDecoder

export function AESEncoder(block: string, key: string): string {
  if (block && key) return CryptoJS.AES.encrypt(block, key).toString();
  return "none";
} // AESEncoder
