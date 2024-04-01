exports.index = async (req, res, next) => {
    try {
    res.render('author.ejs');
    } catch (error) {
    next(error);
    }
};