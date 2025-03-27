

import { createConnection, query } from '@/lib/odbc-cubrid';
import * as state from "@/lib/cubrid";
import {getFormattedResults} from "@/utils/utils";

function generateRowCountSQL(tables){
    let sql = ""
    tables.forEach((item, index) => {
        sql += `select count(*) as row_count from ${item}`;

        if (index < tables.length - 1) {
            sql += `\nUNION ALL\n`
        }
    })
    return sql

}


export default async function handler(req, res) {

    try {
        const { method } = req;

        switch (method) {

            case 'POST':
                const sql = `SELECT db_class.class_name , db_class.comment, db_class.owner_name,
                            (
                                SELECT COUNT(*)
                                FROM db_attribute
                                WHERE class_name = db_class.class_name AND db_class.owner_name = owner_name
                            ) AS columns,
                            COUNT(CASE WHEN db_index.is_primary_key = 'YES' THEN 1 END) AS pk,
                            COUNT(CASE WHEN db_index.is_unique = 'YES' THEN 1 END) AS uk,
                            COUNT(CASE WHEN db_index.is_foreign_key = 'YES' THEN 1 END) AS fk,
                            COUNT(db_index.index_name) AS ind
                             FROM db_class LEFT JOIN db_index ON db_class.class_name = db_index.class_name
                            AND db_class.owner_name = db_index.owner_name
                            WHERE db_class.is_system_class = 'NO' AND db_class.class_type = 'CLASS'
                            GROUP BY db_class.class_name, db_class.owner_name
                            ORDER BY db_class.owner_name;`;

                const {database_login}  = req.body;

                const conn = await createConnection(database_login);
                const result = getFormattedResults(await conn.query(sql));
                const tables = result.map(res=>`${res["owner_name"]}.${res["class_name"]}`);
                const sqlRows = generateRowCountSQL(tables);
                const resultRow = await query(conn, sqlRows);
                res.status(201).json({ success: true, result: result, row: resultRow });
                break;
            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${method} not allowed`);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
