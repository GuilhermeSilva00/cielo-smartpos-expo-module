package expo.modules.cielosmartposexpomodule

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Environment
import android.util.Base64
import expo.modules.kotlin.Promise
import org.json.JSONArray
import org.json.JSONObject
import java.io.File
import java.io.FileOutputStream
import expo.modules.cielosmartposexpomodule.R
import java.nio.charset.StandardCharsets

object PrintHandler {

  private var pendingPromise: Promise? = null

  fun startTextPrint(activity: Activity, json: String, promise: Promise) {
    handlePrint(activity, json, promise, isImage = false)
  }

  fun startBitmapPrint(activity: Activity, json: String, promise: Promise) {
    handlePrint(activity, json, promise, isImage = true)
  }

  private fun handlePrint(activity: Activity, json: String, promise: Promise, isImage: Boolean) {
    try {
      pendingPromise = promise
      var finalJson = json

      if (isImage) {
        // Parse do JSON recebido do JS
        val jsonObject = JSONObject(json)
        val values = jsonObject.getJSONArray("value")
        val base64Bitmap = values.getString(0)

        // Salva a imagem localmente e substitui o value no JSON
        val imagePath = saveBase64Image(base64Bitmap)
        val newValue = JSONArray().put(imagePath)
        jsonObject.put("value", newValue)
        finalJson = jsonObject.toString()
      }

      val base64 = Base64.encodeToString(finalJson.toByteArray(), Base64.NO_WRAP)

      val schema = activity.getString(R.string.schema_return)

      val uri = Uri.Builder()
        .scheme("lio")
        .authority("print")
        .appendQueryParameter("request", base64)
        .appendQueryParameter("urlCallback", "$schema://print")
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
          "code" to 5001,
          "result" to e.message,
          "success" to false
        )
      )
    }
  }

  private fun saveBase64Image(base64: String): String {
    val bytes = Base64.decode(base64, Base64.DEFAULT)

    val dir = File("/storage/emulated/0/saved_images")

    if (!dir.exists()) dir.mkdirs()

    val file = File(dir, "img_${System.currentTimeMillis()}.jpg")

    FileOutputStream(file).use { fos ->
      fos.write(bytes)
    }

    return file.absolutePath
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
        mapOf("result" to json, "code" to "0", "success" to true)
      } else {
        mapOf("result" to "Resposta inválida", "code" to "5010", "success" to false)
      }
    } catch (e: Exception) {
      mapOf("result" to e.toString(), "code" to "5005", "success" to false)
    }
  }
}
