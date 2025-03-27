import CUBRID from 'node-cubrid'



export async function createConnection(param) {
    const {host, port, database, user, password} = param;
    const client = CUBRID.createConnection(host, port, user, password, database);

    try {
        await client.connect();
        return client;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
}

export async function query(conn, sql, param) {

    try {
        return await conn.query(sql, param);
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    } finally {
        conn.close();
    }
}
