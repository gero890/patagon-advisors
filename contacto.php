<?php
/**
 * Patagon Advisors — manejador de formulario de contacto.
 *
 * Recibe el POST del formulario ejecutivo en contacto.html y lo envía por
 * mail() de PHP (soportado de forma nativa en el hosting compartido de
 * Hostinger). No requiere librerías externas ni composer.
 *
 * Nota para quien lo despliegue: la entregabilidad de mail() depende de la
 * configuración de correo del hosting. Si los mensajes no llegan, revisar
 * el panel de Hostinger (Correo > Registros) o considerar un servicio
 * transaccional (Formspree, Web3Forms) como alternativa — en ese caso basta
 * con reemplazar la URL de fetch() en main.js.
 */

header("Content-Type: application/json; charset=utf-8");

// Sólo aceptar POST.
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  echo json_encode(["ok" => false, "error" => "method_not_allowed"]);
  exit;
}

// Honeypot — si el campo oculto viene completo, es un bot: respondemos ok
// sin enviar nada, para no delatar el mecanismo.
if (!empty($_POST["empresa_web"])) {
  echo json_encode(["ok" => true]);
  exit;
}

function clean($v) {
  $v = isset($v) ? trim($v) : "";
  $v = str_replace(["\r", "\n"], " ", $v); // evita inyección de headers
  return htmlspecialchars($v, ENT_QUOTES, "UTF-8");
}

$nombre  = clean($_POST["nombre"]  ?? "");
$empresa = clean($_POST["empresa"] ?? "");
$email   = clean($_POST["email"]   ?? "");
$telefono= clean($_POST["telefono"]?? "");
$area    = clean($_POST["area"]    ?? "");
$mensaje = clean($_POST["mensaje"] ?? "");

if ($nombre === "" || $email === "" || $mensaje === "" || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(422);
  echo json_encode(["ok" => false, "error" => "invalid_input"]);
  exit;
}

$to      = "agustin@atinversiones.com";
$subject = "Nuevo contacto — Patagon Advisors" . ($area ? " · " . $area : "");

$body  = "Nuevo mensaje desde el formulario ejecutivo de patagonadvisors.com.ar\n\n";
$body .= "Nombre: {$nombre}\n";
$body .= "Empresa: " . ($empresa ?: "—") . "\n";
$body .= "Email: {$email}\n";
$body .= "Teléfono: " . ($telefono ?: "—") . "\n";
$body .= "Área de interés: " . ($area ?: "—") . "\n\n";
$body .= "Mensaje:\n{$mensaje}\n";

$headers = [];
$headers[] = "From: Patagon Advisors <no-reply@atinversiones.com>";
$headers[] = "Reply-To: {$nombre} <{$email}>";
$headers[] = "Content-Type: text/plain; charset=UTF-8";

$sent = @mail($to, $subject, $body, implode("\r\n", $headers));

if ($sent) {
  echo json_encode(["ok" => true]);
} else {
  http_response_code(502);
  echo json_encode(["ok" => false, "error" => "mail_failed"]);
}
