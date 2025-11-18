import React from 'react';
import { Alert, Button, ScrollView, Text, View } from 'react-native';
import doAsyncPayment from './CieloModule/doAsyncPayment';
import doAsyncVoidPayment from './CieloModule/doAsyncVoidPayment';
import doAsyncPrintText from './CieloModule/doAsyncPrintText';
import doAsyncPrintBitmap from './CieloModule/doAsyncPrintBitmap';
import { getSerialNumber as getSerial } from './CieloModule/getSerialnumber';
import { PaymentResponse, PaymentCode, OperationPrintType } from 'cielo-smartpos-expo-module';
import * as MediaLibrary from 'expo-media-library';

export default function App() {

  const [lastSale, setLastSale] = React.useState<PaymentResponse | null>(null);

  const [, requestPermission] = MediaLibrary.usePermissions();

  async function doPayment() {
    const json = {
      accessToken: 'CvYJ5hGSimUhOcXcqONl9P6fO7nPn3qvGFoqO0LRDwjKHS9oOL / DwbkDkxRUrNjsBE3q2tQcOJIZCbik8e6VUWB5yx0W1UBRJ2XaQ',
      clientID: 'KXGuEl1Ff4DwMBk3wG7lBGgf6GjDlULAhLoac3tLbZXkOX6jW7',
      email: 'guiluis.silva00@gmail,com',
      installments: 0,
      items: [
        {
          name: 'Geral',
          quantity: 1,
          sku: '10',
          unitOfMeasure: 'unidade',
          unitPrice: 10,
        },
      ],
      paymentCode: 'DEBITO_AVISTA' as PaymentCode,
      value: '10',
    }

    try {
      const result = await doAsyncPayment(json)
      const formatedResult: PaymentResponse = JSON.parse(result.result)
      console.log("result: ", formatedResult)
      setLastSale(formatedResult)
    } catch (error) {
      console.log(error)
    }
  }

  async function doCancel() {

    if(!lastSale){
      return Alert.alert('Ops', 'É necessário realizar uma venda', [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {}},
      ]);
    }

    if(lastSale.status === "CANCELED") {
      return Alert.alert('Ops', 'É necessário que a última venda não seja um cancelamento', [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {}},
      ]);
    }

    const json = {
      id: lastSale.id,
      clientID: 'KXGuEl1Ff4DwMBk3wG7lBGgf6GjDlULAhLoac3tLbZXkOX6jW7',
      accessToken: 'CvYJ5hGSimUhOcXcqONl9P6fO7nPn3qvGFoqO0LRDwjKHS9oOL / DwbkDkxRUrNjsBE3q2tQcOJIZCbik8e6VUWB5yx0W1UBRJ2XaQ',
      cieloCode: lastSale.payments[0].cieloCode,
      authCode: lastSale.payments[0].authCode,
      value: lastSale.payments[0].amount
    }

    try {
      const result = await doAsyncVoidPayment(json)
      const formatedResult: PaymentResponse = JSON.parse(result.result)
      console.log("result: ", formatedResult)
      setLastSale(formatedResult)
    } catch (error) {
      console.log(error)
    }
  }

  async function doTextPrint() {
    const json = {
      operation: "PRINT_TEXT" as OperationPrintType,
      styles: [{}],
      value: ["TEXTO PARA IMPRIMIR NA PRIMEIRA LINHA\nTEXTO PARA IMPRIMIR NA SEGUNDA LINHA\nTEXTO PARA IMPRIMIR NA TERCEIRA LINHA\n\n"]
    }

    try {
      const result = await doAsyncPrintText(json)
      console.log("result: ", JSON.parse(result.result))
    } catch (error) {
      console.log(error)
    }
  }

  async function doBitmapPrint() {
    const res = await requestPermission();
    if(res.granted) {
      const json = {
        operation: "PRINT_IMAGE" as OperationPrintType,
        styles: [{}],
        value: ["iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="]
      }

      try {
        const result = await doAsyncPrintBitmap(json)
        console.log("result: ", result)
      } catch (error) {
        console.log(error)
      }
    }
  }

  function getSerialNumber() {
    const serial = getSerial();
    console.log('Serial Number: ', serial);
    return serial;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>CIELO SMARTPOS</Text>
        <Group name="CIELO">
          <Button
            title="Pagamento"
            onPress={doPayment}
          />
          <Button
            title="Cancelamento"
            onPress={doCancel}
          />
          <Button
            title="Impressão texto"
            onPress={doTextPrint}
          />
          <Button
            title="Impressão imagem(bitmap)"
            onPress={doBitmapPrint}
          />
          <Button
            title="SERIAL DO TERMINAL"
            onPress={getSerialNumber}
          />
        </Group>
        {
          lastSale && (
            <Group name="RESULTADO">
              <Text>{JSON.stringify(lastSale)}</Text>
            </Group>
          )
        }
      </ScrollView>
    </View>
  );
}

function Group(props: { name: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupHeader}>{props.name}</Text>
      {props.children}
    </View>
  );
}

const styles = {
  header: {
    fontSize: 30,
    margin: 20,
  },
  groupHeader: {
    fontSize: 20,
    marginBottom: 20,
  },
  group: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    rowGap: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  view: {
    flex: 1,
    height: 200,
  },
};
