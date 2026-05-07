const db = require('../utility/dbManager');

const insertSIP = async (data) => {

    const sql = `
        INSERT INTO sip
        (
            sip_id,
            investor_id,
            portfolio_id,
            fund_id,
            sip_amount,
            sip_execution_date,
            sip_status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    await db.execute(sql, [
        data.sip_id,
        data.investor_id,
        data.portfolio_id,
        data.fund_id,
        data.sip_amount,
        data.sip_execution_date,
        data.sip_status
    ]);

    return {
        message: 'SIP Registered Successfully'
    };
};

const fetchSIP = async (sipId) => {

    const sql = `
        SELECT * FROM sip
        WHERE sip_id = ?
    `;

    const [rows] = await db.execute(sql, [sipId]);

    return rows;
};

const processSIPTransaction = async (sipId) => {

    const connection = await db.getConnection();

    try {

        await connection.beginTransaction();

        const [sipRows] = await connection.execute(
            `
            SELECT *
            FROM sip
            WHERE sip_id = ?
            `,
            [sipId]
        );

        if (sipRows.length === 0) {
            throw new Error('SIP not found');
        }

        const sip = sipRows[0];

        if (sip.sip_status !== 'ACTIVE') {
            throw new Error('SIP is not active');
        }

        const [fundRows] = await connection.execute(
            `
            SELECT current_nav
            FROM mutual_funds
            WHERE fund_id = ?
            `,
            [sip.fund_id]
        );

        if (fundRows.length === 0) {
            throw new Error('Fund not found');
        }

        const currentNAV =
            fundRows[0].current_nav;

        const unitsPurchased =
            Number(
                (
                    sip.sip_amount / currentNAV
                ).toFixed(6)
            );

        await connection.execute(
            `
            INSERT INTO investment_transactions
            (
                sip_id,
                investor_id,
                fund_id,
                invested_amount,
                nav_at_purchase,
                units_purchased,
                purchase_date
            )
            VALUES (?, ?, ?, ?, ?, ?, CURDATE())
            `,
            [
                sip.sip_id,
                sip.investor_id,
                sip.fund_id,
                sip.sip_amount,
                currentNAV,
                unitsPurchased
            ]
        );

        await connection.commit();

        return {
            message: 'SIP Processed Successfully'
        };

    } catch (error) {

        await connection.rollback();

        throw error;

    } finally {

        connection.release();
    }
};
const fetchTransactions = async (sipId) => {

    const sql = `
        SELECT
            transaction_id,
            invested_amount,
            nav_at_purchase,
            units_purchased,
            purchase_date

        FROM investment_transactions

        WHERE sip_id = ?
    `;

    const [rows] = await db.execute(sql, [sipId]);

    return rows;
};

module.exports = {
    insertSIP,
    fetchSIP,
    processSIPTransaction,
    fetchTransactions
};