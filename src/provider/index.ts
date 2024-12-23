import { createProvider } from "@builderbot/bot";
import { MetaProvider as Provider } from "@builderbot/provider-meta";
import { jwtToken, numberId, verifyToken, version } from "~/config";

export default createProvider(Provider, {
  jwtToken: jwtToken,
  numberId: numberId,
  verifyToken: verifyToken,
  version: version,
});
