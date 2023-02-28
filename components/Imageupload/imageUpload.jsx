import axios from 'axios'

export const ImageUpload = async ( images, CUP, CN, CA) => {
    let imgArr = []
    for ( const item of images ) { 
   
     const formData = new FormData()
      formData.append( "file", item )
      formData.append( "upload_preset",  CUP)
      formData.append( "cloud_name", CN )
 
      const res = await axios.post( CA , formData  )
      const data = await res.data
      imgArr.push({ public_id: data.public_id, url: data.secure_url })
       
    }
    return imgArr;
 }