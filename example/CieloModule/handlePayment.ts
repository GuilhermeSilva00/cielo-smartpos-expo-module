import CieloSmartpos, { PaymentData } from 'cielo-smartpos-expo-module';

export default async function handlePayment(data: PaymentData) {
    return await CieloSmartpos.handlePayment(JSON.stringify(data));
}