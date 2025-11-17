import CieloSmartpos from 'cielo-smartpos-expo-module';

export function getSerialNumber(): string {
    return CieloSmartpos.getSerialNumber();
}