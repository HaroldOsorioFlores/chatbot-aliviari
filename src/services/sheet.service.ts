import { client_email, private_key, spreadsheets_id } from "~/config";
import { google } from "googleapis";
import { IPatient } from "~/lib/definitions";

class ManagerSheets {
  readonly client_email: string;
  readonly private_key: string;
  readonly spreadsheets_id: string;
  readonly authClient;

  constructor(
    spreadsheets_id: string,
    client_email: string,
    private_key: string
  ) {
    this.spreadsheets_id = spreadsheets_id;
    this.authClient = new google.auth.JWT({
      email: client_email,
      key: private_key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  }

  async findPatientByPhone(phone: string): Promise<IPatient | null> {
    const sheets = google.sheets({ version: "v4", auth: this.authClient });
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheets_id,
        range: "Pacientes!A:E",
      });

      const rows = response.data.values || [];

      const findPatient = rows.find((row) => row[0] === phone);

      if (findPatient) {
        const patient: IPatient = {
          phone: findPatient[0],
          fullName: findPatient[1],
          email: findPatient[2],
          medicQuery: findPatient[3],
          confirm: findPatient[4],
          schedule: findPatient[5],
        };
        console.log("Paciente encontrado");
        return patient;
      }
      console.log("No se encontro al paciente");
      return null;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  async createPatient(patient: IPatient): Promise<void> {
    const sheets = google.sheets({ version: "v4", auth: this.authClient });

    try {
      const newRow = [
        patient.phone,
        patient.fullName,
        patient.email,
        patient.medicQuery,
        patient.schedule,
      ];

      await sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheets_id,
        range: "Pacientes!A:B",
        valueInputOption: "RAW",
        requestBody: {
          values: [newRow],
        },
      });

      console.log("Paciente creado con exito");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}

export default new ManagerSheets(spreadsheets_id, client_email, private_key);
