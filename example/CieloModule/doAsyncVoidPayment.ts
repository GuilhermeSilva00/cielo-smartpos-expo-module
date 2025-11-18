import CieloSmartpos, { CancelData } from 'cielo-smartpos-expo-module';

export default async function doAsyncVoidPayment(data: CancelData) {
    return await CieloSmartpos.doAsyncVoidPayment(JSON.stringify(data));
}