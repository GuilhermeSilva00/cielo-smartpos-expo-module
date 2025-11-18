import CieloSmartpos, { PaymentData } from 'cielo-smartpos-expo-module';

export default async function doAsyncPayment(data: PaymentData) {
    return await CieloSmartpos.doAsyncPayment(JSON.stringify(data));
}