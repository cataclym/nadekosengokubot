"use strict";

import { customClient } from "./struct/client";

const client = new customClient();
client.db = require("./pgsql.js");

process.on("unhandledRejection", error => console.error("unhandledRejection | ", error));

run();

async function run() {
	client.settings = await client.db.settings();
	client.login(client.settings.token);
}