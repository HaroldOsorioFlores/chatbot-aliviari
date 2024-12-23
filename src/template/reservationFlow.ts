import { addKeyword, EVENTS } from "@builderbot/bot";
import sheetService from "~/services/sheet.service";

export const verifyPatientFlow = addKeyword(EVENTS.ACTION).addAction(
  async (ctx, ctxFn) => {
    console.log(ctx.from);
    const patientExists = await sheetService.findPatientByPhone(ctx.from);
    console.log(patientExists);

    if (patientExists && patientExists.confirm === "CONFIRMADO") {
      await ctxFn.flowDynamic(
        "Ya tienes una cita reservada en nuestro sistema"
      );
      await ctxFn.gotoFlow(confirmReservationFlow);
      return;
    }

    ctxFn.gotoFlow(reservationFlow);
  }
);

export const confirmReservationFlow = addKeyword(EVENTS.ACTION).addAnswer(
  "¿Deseas registrar otra cita?",
  { capture: true, buttons: [{ body: "Si" }, { body: "No" }] },
  async (ctx, ctxFn) => {
    switch (ctx.body.toLowerCase()) {
      case "si":
        return await ctxFn.gotoFlow(reservationFlow);
      case "no":
        return ctxFn.endFlow(
          "Gracias por usar nuestro servicio. ¡Hasta luego!"
        );
      default:
        return ctxFn.fallBack(
          "Opción no válida. Por favor, elige una opción válida."
        );
    }
  }
);

export const reservationFlow = addKeyword(EVENTS.ACTION)
  .addAnswer(
    "Para reservar tu cita es necesario que ingreses tu información personal, para poder registrarte o verificarte en nuestro sistema y nuestro asesor se pueda comunicar contigo lo mas pronto posible. Deseas continuar ?",
    { capture: true, buttons: [{ body: "Si" }, { body: "No" }] },
    async (ctx, ctxFn) => {
      switch (ctx.body.toLowerCase()) {
        case "si":
          return await ctxFn.flowDynamic("Empecemos !");
        case "no":
          return ctxFn.endFlow(
            "Gracias por usar nuestro servicio. ¡Hasta luego!"
          );
        default:
          return ctxFn.fallBack(
            "Opción no válida. Por favor, elige una opción válida."
          );
      }
    }
  )
  .addAnswer(
    ["Por favor, ingresa tu nombre completo", "Ej: Felipe Suarez Suarez"].join(
      "\n"
    ),
    { capture: true },
    async (ctx, ctxFn) => {
      await sheetService.createPatient({ phone: ctx.from, fullName: ctx.body });
      await ctxFn.flowDynamic(
        `Perfecto ${ctx.body} 👋, registra el siguiente numero en tu telefono como AsesorAliviari, 3102222222, se comunicara contigo lo mas pronto posible!!`
      );
      ctxFn.endFlow(
        "Gracias por usar nuestro servicio, te recomendamos revisar nuestras promociones y preguntas frecuentes, ¡Hasta luego!"
      );
    }
  );
