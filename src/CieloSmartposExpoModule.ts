import { NativeModule, requireNativeModule } from 'expo';

import { CieloSmartposExpoModuleEvents } from './CieloSmartposExpoModule.types';

declare class CieloSmartposExpoModule extends NativeModule<CieloSmartposExpoModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<CieloSmartposExpoModule>('CieloSmartposExpoModule');
