const mysql = require('mysql'),
    con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: "mydb"
    })

function query(sqlString) {

    return new Promise((resolve, reject) => {

        con.query(sqlString, (err, result) => {

            if (err) reject(err)

            resolve(result)

        })

    })

}

con.connect(async err => {
    if (err) throw err
    console.log('MySQL Connected!')

    await query('CREATE DATABASE IF NOT EXISTS mydb')

    await query('CREATE TABLE IF NOT EXISTS tasks (id INT, name VARCHAR(255), description VARCHAR(255), status VARCHAR(255) )')

})

async function create(task) {
    return query(`INSERT INTO tasks (id, name, description, status) VALUES ('${task.id}', '${task.name}', '${task.description}', 'new')`)
}

async function read() {
    return query(`SELECT * FROM tasks`)
}


async function readOne(id) {
    const res = await query(`SELECT * FROM tasks WHERE id='${id}'`)
    return res[0]
}

async function update(task) {
    return query(`UPDATE tasks SET name='${task.name}', description='${task.description}', status='${task.status}' WHERE id='${task.id}'`)
}

async function del(id) {
    return query(`DELETE FROM tasks WHERE id='${id}'`)
}

module.exports = { create, read, readOne, update, del }