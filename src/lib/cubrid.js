import CUBRID from 'node-cubrid'

export async function query(sql, param) {
    const client = CUBRID.createCUBRIDConnection(
        process.env.CUBRID_HOST,
        process.env.CUBRID_PORT,
        process.env.CUBRID_DATABASE,
        process.env.CUBRID_USER,
        process.env.CUBRID_PASSWORD
    );

    try {
        await client.connect();
        const [result] = await client.query(sql, param);
        return result;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    } finally {
        client.close();
    }
}
