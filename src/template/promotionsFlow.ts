import { addKeyword, EVENTS } from "@builderbot/bot";

export const promotionsFlow = addKeyword(EVENTS.ACTION).addAnswer(
  "¡Aprovecha nuestras promociones especiales! 🎉 En la Clínica Aliviari, tenemos ofertas exclusivas para ti, como descuentos en tu primera consulta, paquetes de chequeos preventivos y promociones en tratamientos especializados. No te pierdas la oportunidad de cuidar tu salud al mejor precio. ¡Contáctanos al (054) 276764 o visita nuestra clínica en Calle León Velarde N° 406, Yanahuara, Arequipa, para más detalles!"
);
