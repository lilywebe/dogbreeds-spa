/*
Name: Kavin Thakkar
Date: 6-22-22
File: editColor.js
Description: this script creates a component for editing a color
*/

import {useState, useEffect} from "react";
import UseFetch from "./useFetch";
import {useNavigate} from "react-router-dom";
import {Button, Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";
import JSONPretty from "react-json-pretty";
import "./color.css";



const EditColor = ({showModal, setShowModal, data, reload, setReload, setSubHeading}) => {

    const {error, isLoading, data: response, update} = UseFetch();
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [showButton, setShowButton] = useState(true);



    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: data,
        shouldUseNativeValidation: false
    });

    const editFormOptions = {
        id: {required: "ID is required"},
        name: {required: "Name is required"}
    }

    const handleUpdate = (color) => {
        console.log(color);
        update({"colorID": color.id, "colorName": color.name});
        setSubmitted(true);
    }

    const handleCancel = () => {
        setShowModal(false);
        setSubHeading("All Colors");
        navigate("/colors")
    }

    const handleClose = () => {
        setShowModal(false);
        setShowButton(true);
        setSubmitted(false);
        setReload(!reload);
        setSubHeading("All Colors");
        navigate("/colors")
    }

    useEffect(() => {
        if (!submitted || error != null) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    })

    return (
        <>

            <Modal show={showModal} onHide={handleClose} centered animation={false} backdrop="static">
                <Modal.Header closeButton>
                    <h4>Edit Color</h4>
                </Modal.Header>
                <Modal.Body>
                    {error && <JSONPretty data={error} style={{color: "red"}}></JSONPretty>}
                    {isLoading &&
                    <div className="image-loading">
                        Please wait while data is being loaded
                        <img src={require(`../loading.gif`)} alt="Loading ......"/>
                    </div>
                    }
                    {response && <JSONPretty data={response}></JSONPretty>}
                    {(!submitted || error != null) &&
                    <form className="form-student" id="form-student-edit" onSubmit={handleSubmit(handleUpdate)}>
                        <ul className="form-student-errors">
                            {errors?.id && <li>{errors.id.message}</li>}
                            {errors?.name && <li>{errors.name.message}</li>}
                        </ul>
                        <div className="form-group">
                            <label>Color ID</label>
                            <input name="id" readOnly="readOnly" {...register('id', editFormOptions.id)}/>
                        </div>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" name="name" {...register('name', editFormOptions.name)}/>
                        </div>

                    </form>}
                </Modal.Body>
                <Modal.Footer style={{justifyContent: "center"}}>
                    <Button type="submit" form="form-student-edit" variant="primary"
                            style={{display: (!showButton) ? "none" : ""}}>Update</Button>
                    <Button variant="secondary" onClick={handleCancel}
                            style={{display: (!showButton) ? "none" : ""}}>Cancel</Button>
                    <Button variant="primary" onClick={handleClose}
                            style={{display: (!showButton) ? "" : "none"}}>Close</Button>
                </Modal.Footer>
            </Modal>

        </>
    );
};

export default EditColor;