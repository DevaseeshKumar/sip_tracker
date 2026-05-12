const db = require('../utility/pgManager');

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
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    await db.query(sql, [
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
        WHERE sip_id = $1
    `;

    const result = await db.query(sql, [sipId]);

    return result.rows;
};

const processSIPTransaction = async (sipId) => {

    try {

        await db.query('BEGIN');

        const sipResult = await db.query(
            `
            SELECT *
            FROM sip
            WHERE sip_id = $1
            `,
            [sipId]
        );

        if (sipResult.rows.length === 0) {
            throw new Error('SIP not found');
        }

        const sip = sipResult.rows[0];

        if (sip.sip_status !== 'ACTIVE') {
            throw new Error('SIP is not active');
        }

        const fundResult = await db.query(
            `
            SELECT current_nav
            FROM mutual_funds
            WHERE fund_id = $1
            `,
            [sip.fund_id]
        );

        if (fundResult.rows.length === 0) {
            throw new Error('Fund not found');
        }

        const currentNAV =
            fundResult.rows[0].current_nav;

        const unitsPurchased =
            Number(
                (
                    sip.sip_amount / currentNAV
                ).toFixed(6)
            );

        await db.query(
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
            VALUES ($1, $2, $3, $4, $5, $6, CURRENT_DATE)
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

        await db.query('COMMIT');

        return {
            message: 'SIP Processed Successfully'
        };

    } catch (error) {

        await db.query('ROLLBACK');

        throw error;
    }
};
const fetchTransactions = async (sipId) => {

    const sql = `
        SELECT
            transaction_id,
            sip_id,
            investor_id,
            fund_id,
            invested_amount,
            nav_at_purchase,
            units_purchased,
            purchase_date

        FROM investment_transactions

        WHERE sip_id = $1
    `;

    const result = await db.query(sql, [sipId]);

    return result.rows;
};

const fetchAllTransactions = async () => {

    const sql = `
        SELECT
            transaction_id,
            sip_id,
            investor_id,
            fund_id,
            invested_amount,
            nav_at_purchase,
            units_purchased,
            purchase_date

        FROM investment_transactions

        ORDER BY purchase_date DESC
    `;

    const result = await db.query(sql);

    return result.rows;
};

module.exports = {
    insertSIP,
    fetchSIP,
    processSIPTransaction,
    fetchTransactions,
    fetchAllTransactions
};