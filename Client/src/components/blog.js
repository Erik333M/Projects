import React, { useState, useEffect } from "react";
import UpdateForm from "./updateForm";

export default function Blog() {
    const [blog, setBlog] = useState({
        title: "",
        body: "",
        pictureName: ""
    })
    const [blogList, setBlogList] = useState([])
    const [update, setUpdate] = useState({
        title: "",
        body: "",
        pictureName: ""
    })
    const url = process.env.REACT_APP_SERVER_PORT

    useEffect(() => {

        const GetBlogs = async () => {
            try {
                const res = await fetch(`${url}/blogs`);
                const data = await res.json();
                setBlogList(data)
            } catch (error) {
                console.log(error)
            }
        }
        GetBlogs()
    }, [])



    const change = (e) => {
        const { name, value } = e.target;
        setBlog((prev) => { return { ...prev, [name]: value } })
    }
    const getFileName = (e) => {
        const fileName = e.target.files[0]
        setBlog((prev) => { return { ...prev, pictureName: fileName } })
    }
    const submite = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("file", blog.pictureName)

        try {
            const res = await fetch(`${url}/blogsImageUpload`, {
                method: "POST",
                body: formData
            })
            if (res.status < 200 || res.status >= 300) {
                throw new Error();
            }
            const { filename } = await res.json()
            const createBlog = await fetch(`${url}/blogs`, {
                headers: {
                    'Content-type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ ...blog, pictureName: filename })
            })
            const data = await createBlog.json()
            console.log(data, "**********")
            setBlogList((prev) => [...prev, data]);
        } catch (error) {
            console.log(error)
        }


    }

    const DeleteBlog = async (id) => {
        try {
            const res = await fetch(`${url}/blogs/${id}`, {
                method: "DELETE"
            })
            if (res.status < 200 || res.status >= 300) {
                throw new Error();
            }
            setBlogList((prevState) => prevState.filter(e => e._id !== id))
        } catch (error) {
            console.log(error)
        }
    }
    return <>
        <form onSubmit={submite}>
            <label >
                title:
                <input name='title' value={blog.title} onChange={change} type='title' />
            </label><br />
            <label>
                body:
                <input name='body' value={blog.body} onChange={change} type='text' />
            </label><br />
            <label>
                picture:
                <input onChange={getFileName} type="file" />
            </label><br />
            <select>         <option value="sdf">asdas</option>
            <option value="sdf">asdas</option>
            <option value="sdf">asdas</option></select>
            <button>Send</button>
        </form>
        {blogList.map((e) => {
            return (
                <div key={e._id}>
                    <p>{e.body}</p>
                    <p>{e.title}</p>
                    <img style={{ "width": '90px', "height": "100px" }} src={`${url}/${e.pictureName}`} alt='pic' />
                    <button onClick={() => DeleteBlog(e._id)}>Delete</button>
                    <button onClick={() => setUpdate({ ...e, prevPictur: e.pictureName })}>Update Blog</button>
                </div>
            )
        })}
        <UpdateForm update={update} setUpdate={setUpdate} setBlogList={setBlogList} />
    </>
}