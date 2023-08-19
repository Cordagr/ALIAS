app.post('/upload-photo', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let data = req.files.photo; 
            let id=Math.floor(Math.random() * Date.now()).toString(16);
        
                //move photo to uploads directory
                photo.mv('./uploads/' + photo.name);
                
                //push file details
                data.push({
                    post_id: id;
                    name: photo.name,
                    mimetype: photo.mimetype,
                    size: photo.size
                });
            });
    
            //return response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: data
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});
