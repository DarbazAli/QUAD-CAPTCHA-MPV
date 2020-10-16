const registerRoute = (app, Person) => {
    app.route('/register').post((req, res) => {
        const { email, quad_captcha } = req.body

        if (!email || !quad_captcha) {
            req.flash('error', 'Please provide an email and solve the CAPTCHA!')
            res.redirect('/')
        } else {
            const isExist = Person.countDocuments(
                { email: email },
                (err, count) => {
                    if (count > 0) {
                        req.flash('error', 'this email is already in the list')
                        res.status(401).redirect('/')
                    } else {
                        const newPerson = new Person({
                            email: email,
                        })

                        newPerson.save((err, data) => {
                            if (err) res.send(err)
                            req.flash(
                                'success',
                                `Success! ${data.email} added to waitlist`
                            )
                            res.redirect('/')
                        })
                    }
                }
            )
        }
    })
}
export default registerRoute
