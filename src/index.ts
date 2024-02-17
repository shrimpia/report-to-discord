import { postToDiscord } from "./discord";
import { ReportApiParam } from "./report-api-param";

export interface Env {
  WEBHOOK_URL: string;
  MISSKEY_URL: string;
  KV: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env) {
    const bodyJson = await request.json<ReportApiParam>();
    const mkResponse = await fetch(request.url, {
      method: 'POST',
      headers: request.headers,
      body: JSON.stringify(bodyJson),
    });
    if (!mkResponse.ok) {
      return mkResponse;
    }

    await postToDiscord(env.WEBHOOK_URL, env.MISSKEY_URL, bodyJson);
    return mkResponse;
  },
};
