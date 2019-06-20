module.exports = {
    getProblemPage: (req, res) => {
        let query = "SELECT * FROM `Problem` ORDER BY Diff_Level ASC"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('indexProblem.ejs', {
                problems: result
            });
        });
    }
};