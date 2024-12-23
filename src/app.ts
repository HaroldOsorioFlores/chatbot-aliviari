import { createBot } from "@builderbot/bot";
import { MemoryDB as Database } from "@builderbot/bot";
import template from "./template";
import provider from "./provider";
import { PORT } from "./config";

const main = async () => {
  const { handleCtx, httpServer } = await createBot({
    flow: template,
    provider: provider,
    database: new Database(),
  });

  httpServer(+PORT);
};

main();
