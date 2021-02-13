export function getIndex(req, res) {
    res.render('index', {
        title: 'Homepage',
        user: req.user
    })
}

export function logout(req, res) {
    req.logout()
    console.log('setting cookie to expire immediately')
    res.clearCookie('user')
    res.redirect('/')
}