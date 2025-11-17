import CieloSmartpos, { PrintData } from 'cielo-smartpos-expo-module';

export default async function handleTextprint(data: PrintData) {
    return await CieloSmartpos.handleTextPrint(JSON.stringify(data));
}