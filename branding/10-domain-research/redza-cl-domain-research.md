# Investigación de dominio — redza.cl

Fecha de consulta: 17 de septiembre de 2026.

## Resultado

`redza.cl` aparece disponible en la consulta exacta de WHOIS de NIC Chile al momento de la revisión. La disponibilidad puede cambiar, por lo que conviene registrarlo cuanto antes si Redza decidió usar este nombre.

Consulta oficial: [NIC Chile WHOIS](https://www.nic.cl/registry/Whois.do).

## ¿Porkbun sirve para comprarlo?

No es la opción adecuada para `redza.cl`:

- La búsqueda de `redza.cl` en Porkbun no mostró una oferta de ese dominio.
- La ruta `porkbun.com/tld/cl` redirigió a la tabla general de extensiones.
- La tabla de Porkbun no mostró una ficha registrable para `.cl`; solo aparecieron alternativas como `redzacl.com` y `redzacl.net`.

Porkbun puede seguir siendo útil para un `.com` secundario, pero no debe ser el plan principal para el dominio chileno.

## Dónde registrarlo

### Recomendación: NIC Chile

NIC Chile administra el registro `.CL` y permite crear una cuenta, buscar el dominio y pagar la inscripción desde su panel oficial. La guía oficial indica que el proceso es:

1. Crear una cuenta en [clientes.nic.cl](https://clientes.nic.cl/).
2. Entrar al Panel de Control.
3. Seleccionar “Crear dominio” e ingresar `redza.cl`.
4. Revisar que el titular, contacto administrativo, correo y teléfono sean los de Redza.
5. Pagar desde el carro de compras.
6. Guardar el comprobante y activar la renovación automática si está disponible en la cuenta.

La tabla oficial consultada muestra `CLP $9.990` por un año, exento de IVA. Confirma el total final en el checkout antes de pagar porque tarifas y medios de pago pueden cambiar.

Fuentes oficiales:

- [Inscripción de un nombre de dominio](https://www.nic.cl/ayuda/tutoriales/inscripcion.html)
- [Tarifas vigentes de .CL](https://www.nic.cl/dominios/tarifas.html)
- [Crear cuenta de usuario](https://www.nic.cl/ayuda/tutoriales/cuenta.html)
- [Listado de agentes registradores .CL](https://registry.nic.cl/es/inicio/)

## Datos que conviene usar

- Dominio: `redza.cl`
- Titular: la razón social real de Redza, si existe; de lo contrario, la persona o entidad que legalmente deba custodiarlo.
- Correo de cuenta: un correo que Redza controle permanentemente, no el de una agencia temporal.
- Contacto administrativo: el responsable que podrá recuperar y gestionar el dominio.
- Teléfono comercial: `+56 9 8788 5833`.
- Sitio de destino: proyecto Vercel `redzaweb-codex` en `bobo-labs-8827`.

No uses datos de un diseñador, desarrollador o agencia como titular permanente. Si otra persona ayuda con la configuración, debe hacerlo como contacto técnico o colaborador, no como dueño del dominio.

## Después de registrarlo

En Vercel:

1. Project `redzaweb-codex` → Settings → Domains.
2. Añadir `redza.cl` y `www.redza.cl`.
3. Copiar exactamente los registros DNS que Vercel entregue.
4. Configurar los nameservers o registros en el panel donde esté administrado el DNS del dominio.
5. Esperar la propagación y comprobar HTTPS.
6. Elegir un dominio canónico: normalmente `www.redza.cl` o `redza.cl`, pero no ambos.
7. Mantener redirección 301 del otro formato hacia el canónico.
8. Revisar `/robots.txt`, `/sitemap.xml`, Open Graph, enlaces de WhatsApp y correo.

La metadata actual del sitio usa `https://www.redza.cl` como canonical. No anuncies ese dominio hasta que resuelva al proyecto correcto en Vercel.

## Seguridad y continuidad

- Activa 2FA en NIC Chile y Vercel.
- Guarda el correo de recuperación y los comprobantes en un lugar de la empresa.
- No compartas la contraseña por WhatsApp.
- Renueva antes de la fecha de expiración.
- Mantén el dominio, Vercel, DNS y correo bajo cuentas que Redza controle.
- No confundas registrar, DNS y hosting: NIC Chile registra el `.cl`; Vercel hospeda la web; DNS conecta ambos.

## Decisión recomendada

Registrar primero `redza.cl` directamente en NIC Chile. Después conectar `redza.cl` y `www.redza.cl` a Vercel. Si el presupuesto lo permite, comprar además `redzatransporte.cl` o `redzalogistica.cl` como defensivos, pero usar `redza.cl` como marca principal.
