import CieloSmartpos, { CancelData } from 'cielo-smartpos-expo-module';

export default async function handleCancel(data: CancelData) {
    return await CieloSmartpos.handleCancel(JSON.stringify(data));
}