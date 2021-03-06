import { Listener } from "discord-akairo";

export default class RateLimitListener extends Listener {
	constructor() {
		super("rateLimit", {
			event: "rateLimit",
			emitter: "client",
		});
	}
	// Emitted when the client hits a rate limit while making a request

	public async exec({ timeout, limit, method, path, route }: { timeout: number, limit: number, method: string, path: string, route: string }): Promise<void> {

		console.warn(
			// eslint-disable-next-line
        `🟪      rateLimit | Timeout: ${timeout}
        Limit: ${limit} // Number of requests that can be made to this endpoint
        Method: ${method} // HTTP method used for request that triggered this event
        Path: ${path} // Path used for request that triggered this event
        Route: ${route} // Route used for request that triggered this event`);
	}
}
