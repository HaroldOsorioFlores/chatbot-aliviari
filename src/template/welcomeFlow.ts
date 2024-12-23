import { addKeyword, EVENTS } from "@builderbot/bot";
import { verifyPatientFlow } from "./reservationFlow";
import { faqFlow } from "./faqFlow";
import { promotionsFlow } from "./promotionsFlow";

export const welcomeFlow = addKeyword(EVENTS.WELCOME)
  .addAnswer(
    `Hola bienvenid(a) a nuestro bot de soporte. ¿En qué puedo ayudarte hoy?`
  )
  .addAnswer(
    "Puedes consultar nuestras preguntas frecuentes, reservar una cita o conocer nuestras promociones especiales."
  )
  .addAnswer("Ingresa el numero de la opcion que deseas 👇")
  .addAnswer(
    ["1. Reservar una cita", "2. Preguntas frecuentes", "3. Promociones"].join(
      "\n"
    ),
    { capture: true },
    async (ctx, ctxFn) => {
      switch (ctx.body) {
        case "1":
          return await ctxFn.gotoFlow(verifyPatientFlow);
        case "2":
          return await ctxFn.gotoFlow(faqFlow);
        case "3":
          return await ctxFn.gotoFlow(promotionsFlow);
        default:
          return ctxFn.fallBack("Escoge una opcion valida");
      }
    }
  );
