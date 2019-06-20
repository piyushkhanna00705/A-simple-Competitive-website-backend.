const fs = require('fs');

module.exports = {
    addProblemPage: (req, res) => {
        res.render('add-problem.ejs', {message: ''
        });
    },
    addProblem: (req, res) => {
        // if (!req.files) {
        //     return res.status(400).send("No files were uploaded.");
        // }

        let message = '';
        let p_id = req.body.p_id;
        let tags = req.body.tags;
      //  let position = req.body.position;
        let diff_level=req.body.diff_level;
       
        // let number = req.body.number;
        // let username = req.body.username;
        // let uploadedFile = req.files.image;
        // let image_name = uploadedFile.name;
        // let fileExtension = uploadedFile.mimetype.split('/')[1];
       // image_name = username + '.' + fileExtension;

        let problemQuery = "SELECT * FROM `Problem` WHERE P_ID = '" + p_id + "'";

        db.query(problemQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'ProblemID already exists';
                res.render('add-problem.ejs', {
                    message
                });
            } else {
                // check the filetype before uploading it
                // if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                //     // upload the file to the /public/assets/img directory
                //     uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
                //         if (err) {
                //             return res.status(500).send(err);
                //         }
                        // send the player's details to the database
                        let query = "INSERT INTO `Problem` (P_ID,Tags,Diff_Level) VALUES ('" +
                            p_id + "', '" + tags + "', '" + diff_level + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        });
                    //});
            //     } else {
            //         message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
            //         res.render('add-player.ejs', {
            //             message,
            //             title: Welcome to Socka | Add a new player
            //         });
                }
            // }
        //});
    });
}
};
    // editPlayerPage: (req, res) => {
    //     let playerId = req.params.id;
    //     let query = "SELECT * FROM `players` WHERE id = '" + playerId + "' ";
    //     db.query(query, (err, result) => {
    //         if (err) {
    //             return res.status(500).send(err);
    //         }
    //         res.render('edit-player.ejs', {
    //             title: Edit  Player
    //             ,player: result[0]
    //             ,message: ''
    //         });
    //     });
    // },
    // editPlayer: (req, res) => {
    //     let playerId = req.params.id;
    //     let first_name = req.body.first_name;
    //     let last_name = req.body.last_name;
    //     let position = req.body.position;
    //     let number = req.body.number;

    //     let query = "UPDATE `players` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "', `position` = '" + position + "', `number` = '" + number + "' WHERE `players`.`id` = '" + playerId + "'";
    //     db.query(query, (err, result) => {
    //         if (err) {
    //             return res.status(500).send(err);
    //         }
    //         res.redirect('/');
    //     });
    // },
    // deletePlayer: (req, res) => {
    //     let playerId = req.params.id;
    //     let getImageQuery = 'SELECT image from `players` WHERE id = "' + playerId + '"';
    //     let deleteUserQuery = 'DELETE FROM players WHERE id = "' + playerId + '"';

    //     db.query(getImageQuery, (err, result) => {
    //         if (err) {
    //             return res.status(500).send(err);
    //         }

    //         let image = result[0].image;

    //         fs.unlink(`public/assets/img/${image}`, (err) => {
    //             if (err) {
    //                 return res.status(500).send(err);
    //             }
    //             db.query(deleteUserQuery, (err, result) => {
    //                 if (err) {
    //                     return res.status(500).send(err);
    //                 }
    //                 res.redirect('/');
    //             });
    //         });
    //     });
    // }
//};