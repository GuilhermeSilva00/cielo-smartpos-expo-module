# 💳 cielo-smartpos-expo-module

[Expo](https://expo.dev) module library to simplify integration with Cielo SmartPOS

## 🚀 Installation

```bash
npm i cielo-smartpos-expo-module
```

## Usage

```typescript
import {
  handlePayment,
  handleCancel,
  handleTextPrint,
  handleBitmapPrint,
  getSerialNumber,
  CieloSmartposExpoModule,
} from "cielo-smartpos-expo-module";
```

📁 You can check all function examples in example/App.tsx

## 📚 API Reference

### 🔧 Functions

**handlePayment:**
Starts a payment operation.

**handleCancel:**
Performs a void (cancellation) of a previous payment.

**handleTextPrint:**
Starts a text print

**handleBitmapPrint:**
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
