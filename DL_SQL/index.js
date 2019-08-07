const mysql = require('mysql'),
    database = "RcPHlnRJFY",
    table = "tasks",
    con = mysql.createConnection({
        host: 'remotemysql.com',
        user: 'RcPHlnRJFY',
        password: 'Rh4xmiw8Gi',
        database
    })

function query(sqlString) {

    return new Promise((resolve, reject) => {

        con.query(sqlString, (err, result) => {

            if (err) return reject(err.sqlMessage || err)

            resolve(result)

        })

    })

}

con.connect(async err => {
    if (err) throw err
    console.log('MySQL Connected!')

    await query(`CREATE DATABASE IF NOT EXISTS ${database}`)

    await query(`CREATE TABLE IF NOT EXISTS ${table} (id VARCHAR(255), name VARCHAR(255), description VARCHAR(255), status VARCHAR(255) )`)

})

async function create(task) {
    return query(`INSERT INTO ${table} (id, name, description, status) VALUES ('${task.id}', '${task.name}', '${task.description}', 'new')`)
}

async function read() {
    return query(`SELECT * FROM ${table}`)
}


async function readOne(id) {
    const res = await query(`SELECT * FROM ${table} WHERE id='${id}'`)
    return res[0]
}

async function update(task) {
    return query(`UPDATE ${table} SET name='${task.name}', description='${task.description}', status='${task.status}' WHERE id='${task.id}'`)
}

async function del(id) {
    return query(`DELETE FROM ${table} WHERE id='${id}'`)
}

module.exports = { create, read, readOne, update, del }