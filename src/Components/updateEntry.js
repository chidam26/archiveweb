import { useState } from "react";


export default function UpdateEntry({ _id, handleClose, handleUpdate }) {
    const [data, setData] = useState({ title: "", link: "", description: "" });

    function handleChange(e) {
        setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        console.log({ _id }, { data });

        fetch(`http://localhost:8000/api/entries/${_id}`, data)
            .then((res) => {
                setData({ title: "", link:"", description: "" });
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log("Failed to update todo");
                console.log(err.message);
            });
    }

    return (
        <form
            className="form-container"
            onSubmit={(e) => {
                handleSubmit(e);
                handleUpdate();
                handleClose();
            }}
        >
            <label htmlFor="title" className="label">
                Title
            </label>
            <input
                type="text"
                name="title"
                className="input"
                onChange={handleChange}
            />
            <label htmlFor="link" className="label">
                Link
            </label>
            <input
                type="text"
                name="link"
                className="input"
                onChange={handleChange}
            />
            <label htmlFor="description" className="label">
                Description
            </label>
            <input
                type="text"
                name="description"
                className="input"
                onChange={handleChange}
            />
            <button type="submit" className="button">
                Submit
            </button>
        </form>
    );
}