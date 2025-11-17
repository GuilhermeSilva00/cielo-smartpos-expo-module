import CieloSmartpos, { PrintData } from 'cielo-smartpos-expo-module';

export default async function handleBitmapPrint(data: PrintData) {
    return await CieloSmartpos.handleBitmapPrint(JSON.stringify(data));
}