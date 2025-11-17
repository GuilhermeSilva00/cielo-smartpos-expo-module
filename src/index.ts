// Reexport the native module. On web, it will be resolved to CieloSmartposExpoModule.web.ts
// and on native platforms to CieloSmartposExpoModule.ts
export { default } from './CieloSmartposExpoModule';
export * from  './CieloSmartposExpoModule.types';
