// utility to authenticate users logged in status

const withAuth = (req, res , next) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    }
};


  module.exports = withAuth; 