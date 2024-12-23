import { addKeyword, EVENTS } from "@builderbot/bot";

export const faqFlow = addKeyword(EVENTS.ACTION)
  .addAnswer(
    "¡Perfecto! Aquí tienes algunas de las preguntas más comunes que recibimos:"
  )
  .addAnswer(
    [
      "1. ¿Qué especialidades ofrecemos?",
      "2. ¿Cuáles son los horarios de atención, numero de contacto y ubicación de la clínica?",
      "3. ¿Cómo puedo pagar mis consultas?",
      "4. ¿Ofrecen servicios de emergencia?",
      "5. Salir",
    ].join("\n"),
    { capture: true },
    async (ctx, ctxFn) => {
      switch (ctx.body) {
        case "1":
          return await ctxFn.flowDynamic([
            "Psiquiatría",
            "Oftalmología",
            "Traumatología",
            "Pediatría",
            "Gastroenterología",
            "Dermatología",
            "Obstetricia",
            "Endocrinología",
            "Urología",
            "Nutrición",
            "Cardiología",
            "Neurología",
            "Oncología Médica",
            "Otorrinolaringología",
            "Cirugía General",
            "Cirugía Cardiovascular",
            "Cirugía Oncológica",
            "Ginecología",
            "Medicina Física y Rehabilitación",
          ]);
        case "2":
          return await ctxFn.flowDynamic(
            "Atendemos de 7:00 AM a 7:00 PM de lunes a viernes. Para consultas o agendar una cita, puedes comunicarte al número (054) 276764, donde estaremos disponibles para responder rápidamente a tus necesidades de atención médica. Nuestra dirección es Calle León Velarde N° 406, Yanahuara, Arequipa."
          );
        case "3":
          return await ctxFn.flowDynamic("loremdisup");
        case "4":
          return await ctxFn.flowDynamic(
            "Sí, ofrecemos servicios de emergencia para atender casos urgentes. Además, contamos con un Centro Quirúrgico equipado con tecnología de punta y un equipo de médicos especializados en situaciones críticas 😊. También disponemos de una Ambulancia para brindar atención inmediata en caso de necesidades urgentes"
          );
        case "5":
          return ctxFn.endFlow(
            "Gracias por usar nuestro servicio, hasta pronto 😊"
          );
        default:
          return ctxFn.fallBack("Lo siento, esa opcion no es valida");
      }
    }
  );
