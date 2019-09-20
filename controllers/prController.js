let data = [{
    id: '1',
    description: 'Ação One Page',
    area: 'Trade',
    date: '09/09/2019',
    originalValue: 'R$ 19.542,84',
    prValue: '',
    ressarcimentValue: '',
    ressarcimentValue: ''
},{
    id: '1',
    description: 'Ação Two Page',
    area: 'Trade',
    date: '09/09/2019',
    originalValue: 'R$ 19.542,84',
    prValue: '',
    ressarcimentValue: '',
    ressarcimentValue: ''
}]

module.exports = (app) => {

    app.get('/', (req, res) => {
        res.render('index', { data: data })
    })

}
