import odbc from 'odbc'
import {getFormattedResults} from "@/utils/utils";



export async function createConnection(param) {

    const {host, port, database, user, password} = param;
    const connectionString =`driver={CUBRID Driver};SERVER=${host};PORT=${port};UID=${user};PWD=${password};DB_NAME=${database};`
    console.log(connectionString);
    try {
        return await odbc.connect(connectionString);

    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
}

export async function query(conn, sql, params, callback) {

    try {
        const result = await conn.query(sql, params, callback);
        return getFormattedResults(result);
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    } finally {
        conn.close();
    }
}
