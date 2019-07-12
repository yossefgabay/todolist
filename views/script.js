const
    form = document.getElementById('form'),
    ul = document.getElementById('list')

async function render(list) {

    if (!list) {
        const res = await axios.get('/tasks'),
            { data } = res

        if (data.error) {
            error.innerText = `ERROR: ${data.error}`
            return
        }

        list = res.data
    }

    ul.innerHTML = list.map(task => `<li title="${task.description}">
                <h3>${task.name}</h3>
                <span class="status ${task.status}">${task.status}</span>
            </li>`).join('')

}
render()

form.onsubmit = async function (e) {

    e.preventDefault()

    const inputs = Object.values(form),
        name = inputs[0].value,
        description = inputs[1].value

    await axios.post('tasks', {
        name,
        description
    })

    form.reset()

    render()
}