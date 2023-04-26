const Song = require('../models/song');

async function create(req, res) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    try {
        const foundSong = await Song.findById(req.params.id);
        foundSong.comments.push(req.body);
        await foundSong.save()
        res.redirect(`/songs/${foundSong._id}`);
        console.log('im here')
    } catch (error) {
        console.log(error);
        res.render('error', {title: 'Uh, O! Something happened'});
    }
}

async function deleteComment(req, res) {
    try {
        const song = await Song.findOne({ 'comments._id': req.params.id, 'comments.user': req.user._id });
        if (!song) return res.redirect('/songs');
        song.comments.remove(req.params.id);
        await song.save()
        res.redirect(`/songs/${song._id}`);
    } catch (error) {
        console.log(error);
        res.render('error', {title: 'Uh O! Something went wrong'});
    }
}

async function editComment(req, res){
    try{
        //trying to get comment id
        const song = await Song.findById(req.params.id);
        const comment = song.comments;
        comment.text = req.body.text;
        await song.save();
        //want to render this 
    }catch(error){
        console.log(error);
        res.render('error', {title: "ruh Oh! Here's a scooby snack!"});
    }
}

// async function updateComment(req, res){
//     try{
//         const updateComment = await Song.comments.findById(req.params.id)
//         //res.redirect(`/songs/${updateComment._id}`);
//     }catch(error){
//         console.log(error);
//         res.render('error', {title: "ruh Oh! Here's a scooby snack!"});
//     }
// }

module.exports = {
    create,
    edit: editComment,
    //update: updateComment,
    delete: deleteComment
};
