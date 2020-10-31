// Get data from database

import { Pool } from "pg";
const pool = new Pool({
	user: "nadeko",
	host: "localhost",
	database: "nadeko",
	password: "nadeko",
	port: 5432,
});

export default async (q: any): Promise<unknown> => {
	const res = await pool.query(q);
	return res.rows;
};

export async function settings(): Promise<unknown> {
	const res = await pool.query("select * from settings");
	return res.rows[0];
}
