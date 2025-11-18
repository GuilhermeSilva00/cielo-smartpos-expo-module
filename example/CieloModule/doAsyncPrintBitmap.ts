import CieloSmartpos, { PrintData } from 'cielo-smartpos-expo-module';

export default async function doAsyncPrintBitmap(data: PrintData) {
    return await CieloSmartpos.doAsyncPrintBitmap(JSON.stringify(data));
}