const indexRoute = (app) => {
    // create the home url
    app.get('/', (req, res) => {
        res.render('index', {
            title: 'QUAD CAPTCHA',
            error: req.flash('error'),
            success: req.flash('success'),
        })
    })
}
export default indexRoute
