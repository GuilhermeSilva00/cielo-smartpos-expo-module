import CieloSmartpos, { PrintData } from 'cielo-smartpos-expo-module';

export default async function doAsyncPrintText(data: PrintData) {
    return await CieloSmartpos.doAsyncPrintText(JSON.stringify(data));
}