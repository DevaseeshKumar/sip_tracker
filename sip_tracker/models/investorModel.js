const db = require('../utility/pgManager');



const insertInvestor = async (data) => {

    const sql = `
        INSERT INTO investors
        (
            investor_id,
            first_name,
            last_name,
            email,
            phone_number,
            pan_number,
            password
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;



    const values = [

        data.investor_id,
        data.first_name,
        data.last_name,
        data.email,
        data.phone_number,
        data.pan_number,
        data.password
    ];



    await db.query(sql, values);



    return {

        message:
            'Investor Created Successfully'
    };
};



const fetchInvestor = async (
    investorId
) => {

    const sql = `
        SELECT *
        FROM investors
        WHERE investor_id = $1
    `;



    const result =
        await db.query(
            sql,
            [investorId]
        );



    return result.rows;
};



const fetchHoldings = async (
    investorId
) => {

    const sql = `
        SELECT

            mf.fund_name,

            SUM(it.units_purchased)
            AS units_held,

            mf.current_nav,

            SUM(it.units_purchased)
            * mf.current_nav
            AS current_value

        FROM investment_transactions it

        JOIN mutual_funds mf
        ON it.fund_id = mf.fund_id

        WHERE it.investor_id = $1

        GROUP BY
            mf.fund_name,
            mf.current_nav
    `;



    const result =
        await db.query(
            sql,
            [investorId]
        );



    return result.rows;
};



const fetchNetworth = async (
    investorId
) => {

    const sql = `
        SELECT

            SUM(
                it.units_purchased
                * mf.current_nav
            ) AS networth

        FROM investment_transactions it

        JOIN mutual_funds mf
        ON it.fund_id = mf.fund_id

        WHERE it.investor_id = $1
    `;



    const result =
        await db.query(
            sql,
            [investorId]
        );



    return result.rows;
};

const getAllInvestors = async () => {

    const sql = `
        SELECT *
        FROM investors
    `;

    const result = await db.query(sql);

    return result.rows;
};



module.exports = {

    insertInvestor,

    fetchInvestor,

    fetchHoldings,

    fetchNetworth,

    getAllInvestors
};