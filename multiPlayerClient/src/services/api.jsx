import axios from "axios"
import Cookies from "js-cookie"

const baseUrl = import.meta.env.VITE_SERVERURL

const createPostApi= async (details)=>{
    const response = await axios.post(`${baseUrl}/createPost`,details)
    if(response.status == 200 )
        alert("Post created Successfully")
    else if(response.status== 201)
        alert(response.data.error)
}

const updatePostApi= async (details)=>{

    const response = await axios.post(`${baseUrl}/updatePost`,details)
    if(response.status == 200 )
        alert("Post updated Successfully")
    else if(response.status== 201)
        alert(response.data.error)
}

const deletePostApi = async (details)=>{
    const cookie =Cookies.get("userToken")

    const response = await axios.post(`${baseUrl}/deletePost`,{...details,cookie})
    if(response.status == 200 )
        alert("Post deleted Successfully")
    else if(response.status== 201)
        alert(response.data.error)
}

const getAllPostApi = async (details)=>{
    const cookie =Cookies.get("userToken")

    const response = await axios.post(`${baseUrl}/getAllPost`,{...details,cookie})

    console.log("res",response)

    if(response.status == 200 )
        return response.data
    else if(response.status== 201)
         alert(response.data.error)
}

const getAllPostByUserApi = async (details)=>{
    const cookie =Cookies.get("userToken")

    const response = await axios.post(`${baseUrl}/getAllPostByUser`,{...details,cookie})
   
  
    if(response.status == 200 )
        return response.data
    else if(response.status== 201)
         alert(response.data.error)
}

const handleFollowUnFollowApi=async (details)=>{

    const cookie =Cookies.get("userToken")

    const response = await axios.post(`${baseUrl}/followUnfollow`,{...details,cookie})
    
    if(response.status == 200 )
        return 
    else if(response.status== 201)
         alert(response.data.error)
}
const getFollowerFollowingList=async(details)=>{

    const cookie =Cookies.get("userToken")

    const response = await axios.post(`${baseUrl}/getFollowerFollowingList`,{...details,cookie})
    
    if(response.status == 200 )
        return response.data
    else if(response.status== 201)
         alert(response.data.error)

}

const getPostIdDetailsApi=async(details)=>{

    const cookie =Cookies.get("userToken")

    const response = await axios.post(`${baseUrl}/getPostDetails`,{...details,cookie})
    if(response.status == 200 )
        return response.data
    else if(response.status== 201)
         alert(response.data.error)

}

const sendCommentApi=async(details)=>{

    const cookie =Cookies.get("userToken")

    console.log(details)
    const response = await axios.post(`${baseUrl}/addComment`,{...details,cookie})
    if(response.status == 200 )
        return response.data
           
}

export {baseUrl,getFollowerFollowingList,sendCommentApi,getPostIdDetailsApi,handleFollowUnFollowApi,createPostApi,updatePostApi,deletePostApi,getAllPostApi,getAllPostByUserApi }
