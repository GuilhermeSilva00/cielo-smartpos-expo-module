# 💳 cielo-smartpos-expo-module

[Expo](https://expo.dev) module library to simplify integration with Cielo SmartPOS

## 🚀 Installation

```bash
npm i cielo-smartpos-expo-module
```

## Usage

```typescript
import {
  doAsyncPayment,
  doAsyncVoidPayment,
  doAsyncPrintText,
  doAsyncPrintBitmap,
  getSerialNumber,
  CieloSmartposExpoModule,
} from "cielo-smartpos-expo-module";
```

📁 You can check all function examples in example/App.tsx

## 📚 API Reference

### 🔧 Functions

**doAsyncPayment:**
Starts a payment operation.

**doAsyncVoidPayment:**
Performs a void (cancellation) of a previous payment.

**doAsyncPrintText:**
Starts a text print

**doAsyncPrintBitmap:**
Starts a image print

**getSerialNumber:**
Returns the SmartPOS device serial number.

**CieloSmartposExpoModule:**
Default exported module object (contains methods registration helpers).

## Contributing

🤝 Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)
