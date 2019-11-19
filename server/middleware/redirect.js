module.exports = (req, res, next) => {
    const re = /\w+/;

    const isMatch = req.url.match(re);

    const page = isMatch && Array.isArray(isMatch) ? req.url.match(re)[0] : null;

    if (page === 'api') {
        next();
    } else {
        res.redirect('http://52.78.12.223:3002/');
    }
}