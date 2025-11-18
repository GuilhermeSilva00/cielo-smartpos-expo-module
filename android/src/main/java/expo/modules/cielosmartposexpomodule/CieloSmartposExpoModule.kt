package expo.modules.cielosmartposexpomodule

import expo.modules.kotlin.Promise
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import android.os.Build

class CieloSmartposExpoModule : Module() {

  override fun definition() = ModuleDefinition {

    Name("CieloSmartposExpoModule")

    OnNewIntent { intent ->
      val data = intent?.data ?: return@OnNewIntent
      val action = data.host // <- "payment", "payment-reversal" or "print"

      when (action) {
        "payment" -> PaymentHandler.handleResponseIntent(intent)
        "payment-reversal" -> CancelHandler.handleResponseIntent(intent)
        "print" -> PrintHandler.handleResponseIntent(intent)
      }
    }

    Function("getSerialNumber") {
      try {
        Build.SERIAL ?: "unknown"
      } catch (e: Exception) {
        "unknown"
      }
    }

    AsyncFunction("doAsyncPayment") { json: String, promise: Promise ->
      val activity = appContext.currentActivity
        ?: return@AsyncFunction promise.reject("5000", "Activity não encontrada", null)

      PaymentHandler.startPayment(activity, json, promise)
    }

    AsyncFunction("doAsyncVoidPayment") { json: String, promise: Promise ->
      val activity = appContext.currentActivity
        ?: return@AsyncFunction promise.reject("5000", "Activity não encontrada", null)

      CancelHandler.startCancel(activity, json, promise)
    }

    AsyncFunction("doAsyncPrintText") { json: String, promise: Promise ->
      val activity = appContext.currentActivity
        ?: return@AsyncFunction promise.reject("5000", "Activity não encontrada", null)

      PrintHandler.startTextPrint(activity, json, promise)
    }

    AsyncFunction("doAsyncPrintBitmap") { json: String, promise: Promise ->
      val activity = appContext.currentActivity
        ?: return@AsyncFunction promise.reject("5000", "Activity não encontrada", null)

      PrintHandler.startBitmapPrint(activity, json, promise)
    }
  }
}
