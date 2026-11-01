# Portal de Atención Estudiantil

Crea una aplicación web frontend en React (sin backend, usando useState para persistir los datos en memoria) para el Portal de Reservas de Relaciones Estudiantiles (RREE) de la Universidad Técnica Federico Santa María (UTFSM), Campus San Joaquín. El usuario actual ya está autenticado como 'Adolfo Epstein (Rol: 202273514-K, Ing. Civil Informática)'.
Regla estricta: NO pongas enlaces decorativos, ni botones de login/logout, ni menús que no funcionen. Todo botón visible debe ser 100% funcional.
La barra de navegación superior debe tener exactamente 3 vistas:
1. 'Inicio': Muestra dos tarjetas principales con descripciones claras para evitar confusión: 'Salud y Apoyo Psicológico' (Psicología, Médico, Dental) y 'Beneficios y Asistencia Social' (Gratuidad, Becas MINEDUC, Congelamiento), cada una con un botón que lleva a la vista de agendar pre-filtrada en esa categoría, más un acceso rápido a 'Mis Citas Agendadas'.
2. 'Agendar Atención': Permite elegir Categoría (Salud/Psicología o Asistencia Social), Profesional real (ej. 'Ps. Roberto Méndez - Oficina F-154' o 'Sra. Carmen Cárdenas Mundaca - Asistente Social, Oficina F-152, carmen.cardenas@usm.cl'), Fecha y Bloque Horario USM seleccionable mediante botones interactivos (ej. '09:00 - 09:20', '10:55 - 12:05', '12:00 - 12:20'), y 'Motivo de Atención' (con selector de trámite y comentarios). Si elige Asistencia Social y selecciona un trámite como 'Congelar con Gratuidad' o 'Pérdida de beneficios MINEDUC', debe mostrarse dinámicamente un cuadro informativo con los documentos obligatorios que debe presentar. Incluye validación en tiempo real con asteriscos rojos para que no permita enviar si faltan campos. Al enviar, agrega la cita al estado global y muestra un comprobante de confirmación con opción de ir a 'Mis Citas Agendadas'.
3. 'Mis Citas Agendadas': Lista las citas activas (incluye 2 citas precargadas de ejemplo y las nuevas que se agenden). Cada cita debe tener un botón funcional 'Ver Comprobante' (abre un modal con el detalle oficial de la reserva) y un botón 'Anular Solicitud de Hora' (pide confirmación en un modal y elimina la cita de la lista).

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9038d9fb-a64f-4ed0-8013-60b4fe7d908c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
