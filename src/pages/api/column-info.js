
import { createConnection, query } from '@/lib/odbc-cubrid';

export default async function handler(req, res) {

    try {
        const { method } = req;

        switch (method) {

            case 'POST':
                const sql = `select * from db_attribute where owner_name=? and class_name=?`;

                const {database_login, owner, table}  = req.body;

                const conn = await createConnection(database_login);
                const result = await query(conn, sql, [owner, table]);

                res.status(201).json({ success: true, result: result });
                break;
            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${method} not allowed`);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
