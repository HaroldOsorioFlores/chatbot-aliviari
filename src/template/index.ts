import { faqFlow } from "./faqFlow";
import { promotionsFlow } from "./promotionsFlow";
import {
  confirmReservationFlow,
  reservationFlow,
  verifyPatientFlow,
} from "./reservationFlow";
import { welcomeFlow } from "./welcomeFlow";
import { createFlow } from "@builderbot/bot";

export default createFlow([
  welcomeFlow,
  verifyPatientFlow,
  confirmReservationFlow,
  reservationFlow,
  faqFlow,
  promotionsFlow,
]);
