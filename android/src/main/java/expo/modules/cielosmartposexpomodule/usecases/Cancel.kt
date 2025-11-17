package expo.modules.cielosmartposexpomodule

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.util.Base64
import expo.modules.kotlin.Promise
import expo.modules.cielosmartposexpomodule.R
import java.nio.charset.StandardCharsets

object CancelHandler {

  private var pendingPromise: Promise? = null

  fun startCancel(activity: Activity, json: String, promise: Promise) {
    try {
      pendingPromise = promise

      val base64 = Base64.encodeToString(json.toByteArray(), Base64.NO_WRAP)

      val schema = activity.getString(R.string.schema_return)

      val uri = Uri.Builder()
        .scheme("lio")
        .authority("payment-reversal")
        .appendQueryParameter("request", base64)
        .appendQueryParameter("urlCallback", "$schema://payment-reversal")
        .build()

      val intent = Intent(Intent.ACTION_VIEW).apply {
        addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)
        data = uri
      }

      activity.startActivity(intent)

    } catch (e: Exception) {
      pendingPromise = null
      promise.resolve(
        mapOf(
          "code" to 5000,
          "result" to e.message,
          "success" to false
        )
      )
    }
  }

  fun handleResponseIntent(intent: Intent?): Map<String, Any?> {
    val promise = pendingPromise ?: return emptyMap()
    pendingPromise = null

    return createResponseParams(intent).also { result ->
      promise.resolve(result)
    }
  }

  private fun createResponseParams(intent: Intent?): Map<String, Any?> {
    return try {
      val data = intent?.data
      val response = data?.getQueryParameter("response")

      if (response != null) {
        val decoded = Base64.decode(response, Base64.DEFAULT)
        val json = String(decoded, StandardCharsets.UTF_8)

        mapOf(
          "result" to json,
          "code" to "0",
          "success" to true
        )
      } else {
        mapOf(
          "result" to "Resposta inválida",
          "code" to "5010",
          "success" to false
        )
      }
    } catch (e: Exception) {
      mapOf(
        "result" to e.toString(),
        "code" to "5005",
        "success" to false
      )
    }
  }
}
