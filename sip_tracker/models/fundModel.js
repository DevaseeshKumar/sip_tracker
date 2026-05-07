const db = require('../utility/dbManager');



const insertAMC = async (data) => {

    const sql = `
        INSERT INTO amc
        (
            amc_id,
            amc_name
        )
        VALUES (?, ?)
    `;

    await db.execute(sql, [
        data.amc_id,
        data.amc_name
    ]);

    return {
        message: 'AMC Created Successfully'
    };
};



const fetchAMCs = async () => {

    const sql = `
        SELECT *
        FROM amc
    `;

    const [rows] = await db.execute(sql);

    return rows;
};



const insertFund = async (data) => {

    const sql = `
        INSERT INTO mutual_funds
        (
            fund_id,
            amc_id,
            fund_name,
            fund_category,
            current_nav
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    await db.execute(sql, [
        data.fund_id,
        data.amc_id,
        data.fund_name,
        data.fund_category,
        data.current_nav
    ]);

    return {
        message: 'Fund Created Successfully'
    };
};



const fetchFunds = async () => {

    const sql = `
        SELECT
            mf.fund_id,

            a.amc_id,

            mf.fund_name,

            a.amc_name,

            mf.fund_category,

            mf.current_nav

        FROM mutual_funds mf

        JOIN amc a
        ON mf.amc_id = a.amc_id
    `;

    const [rows] = await db.execute(sql);

    return rows;
};



const updateFundNAV = async (
    fundId,
    current_nav
) => {

    const sql = `
        UPDATE mutual_funds
        SET current_nav = ?
        WHERE fund_id = ?
    `;

    await db.execute(sql, [
        current_nav,
        fundId
    ]);

    return {
        message: 'NAV Updated Successfully'
    };
};



module.exports = {
    insertAMC,
    fetchAMCs,
    insertFund,
    fetchFunds,
    updateFundNAV
};