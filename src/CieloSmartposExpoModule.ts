import { NativeModule, requireNativeModule } from 'expo';

import { CieloResponse } from './CieloSmartposExpoModule.types';

declare class CieloSmartposExpoModule extends NativeModule {
  handlePayment(json: string): Promise<CieloResponse>;
  handleCancel(json: string): Promise<CieloResponse>
  handleTextPrint(json: string): Promise<CieloResponse>
  handleBitmapPrint(json: string): Promise<CieloResponse>
  getSerialNumber(): string;
}


// This call loads the native module object from the JSI.
export default requireNativeModule<CieloSmartposExpoModule>('CieloSmartposExpoModule');
