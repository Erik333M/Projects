import React from 'react'

const UpdateForm = ({ update, setUpdate, setBlogList }) => {
    const url = process.env.REACT_APP_SERVER_PORT
    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'pictureName') {
            setUpdate((prevState) => { return { ...prevState, [name]: e.target.files[0] } })
        } else {
            setUpdate((prevState) => { return { ...prevState, [name]: value } })
        }
    }
    const Submite = async (e) => {
        e.preventDefault();
        try {
            let newPicture = null
            if (typeof update.pictureName !== "string") {
                const formData = new FormData();
                formData.append('file', update.pictureName)
                const res = await fetch(`${url}/blogsImageUpload`, {
                    method: "POST",
                    body: formData
                })
                if (res.status < 200 || res.status >= 300) {
                    throw new Error()
                }
                const data = await res.json()
                newPicture = data.filename
            }
            const updateData = newPicture ? { ...update, pictureName: newPicture } : { title: update.title, body: update.body }


            const res = await fetch(`${url}/blogs/${update._id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(updateData)
            })
            if (res.status < 200 || res.status >= 300) {
                throw new Error()
            }
            const data = await res.json()
            setBlogList((prevState) => prevState.map((e) => {
                if (e._id === data._id) {
                    e = data
                }
                return e
            }))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={Submite}>
            <input name='title' value={update.title} onChange={handleChange} />
            <input name='body' value={update.body} onChange={handleChange} />
            <input type='file' name='pictureName' onChange={handleChange} />
            <button>Update</button>
        </form>
    )
}

export default UpdateForm;