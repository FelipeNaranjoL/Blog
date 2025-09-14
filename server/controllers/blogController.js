export const addBlog = async (req, res) => {
    try {
        const{title,subTitle,description,category,isPublished} = JSON.parse(req.body.blog);
        const imageFile = req.file;
        
        if(!title||!subTitle||!description||!category||!imageFile){
            return res.json({success: false, message: "Campos vacios o mal insertados"})
        }
        
    } catch (error) {
        
    }
}