import { requireNativeView } from 'expo';
import * as React from 'react';

import { CieloSmartposExpoModuleViewProps } from './CieloSmartposExpoModule.types';

const NativeView: React.ComponentType<CieloSmartposExpoModuleViewProps> =
  requireNativeView('CieloSmartposExpoModule');

export default function CieloSmartposExpoModuleView(props: CieloSmartposExpoModuleViewProps) {
  return <NativeView {...props} />;
}
