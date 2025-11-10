import * as React from 'react';

import { CieloSmartposExpoModuleViewProps } from './CieloSmartposExpoModule.types';

export default function CieloSmartposExpoModuleView(props: CieloSmartposExpoModuleViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
