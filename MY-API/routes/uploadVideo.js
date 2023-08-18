app.post('/upload-video', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let data = req.files.video; 
    
        
                //move photo to uploads directory
                photo.mv('./uploads/' + video.name);

                //push file details
                data.push({
                    name: video.name,
                    mimetype: video.mimetype,
                    size: video.size
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
