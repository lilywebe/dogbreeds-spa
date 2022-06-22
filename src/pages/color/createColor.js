import {useState, useEffect} from "react";
import UseFetch from "../../services/useFetch";
import {Button, Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";
import JSONPretty from "react-json-pretty";
import './color.css';

import React from 'react';

const CreateColor = ({showModal, setShowModal, reload, setReload, setSubHeading}) => {
    const {error, isLoading, data: response, create} = UseFetch();
    const [submitted, setSubmitted] = useState(false);
    const [showButton, setShowButton] = useState(true);

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {colorID: "", colorName: ""},
        shouldUseNativeValidation: false
    });
    const createFormOptions = {
        colorID: {required: "ID is required"},
        colorName: {required: "Name is required"}
    }

    const handleCreate = (color) => {
        create(color);
        setSubmitted(true);
    }
    const handleCancel = () => {
        setShowModal(false);
        setSubHeading("All Colors");
    }
    const handleClose = () => {
        setShowModal(false);
        setShowButton(true);
        setSubmitted(false);
        setReload(!reload);
        setSubHeading("All Colors");
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
                    <h4>Create Student</h4>
                </Modal.Header>
                <Modal.Body>
                    {error && <JSONPretty data={error}></JSONPretty>}
                    {isLoading &&
                        <div className="image-loading">
                            Please wait while data is being loaded
                            <img src={require(`../loading.gif`)} alt="Loading ......"/>
                        </div>
                    }
                    {response && <JSONPretty data={response}></JSONPretty>}
                    {(!submitted || error != null) &&
                        <form className="form-color" id="form-color-edit" onSubmit={handleSubmit(handleCreate)}>
                            <ul className="form-color-errors">
                                {errors?.colorID && <li>{errors.colorID.message}</li>}
                                {errors?.colorName && <li>{errors.colorName.message}</li>}
                            </ul>
                            <div className="form-group">
                                <label>Color ID</label>
                                <input name="colorID" {...register('colorID', createFormOptions.colorID)}/>
                            </div>
                            <div className="form-group">
                                <label>Color Name</label>
                                <input type="text" name="colorName" {...register('colorName', createFormOptions.colorName)}/>
                            </div>
                        </form>
                    }
                </Modal.Body>
                <Modal.Footer style={{justifyContent: "center"}}>
                    <Button variant="primary" form="form-color-edit" type="submit"
                            style={{display: (!showButton) ? "none" : ""}}>Create</Button>
                    <Button variant="secondary" onClick={handleCancel}
                            style={{display: (!showButton) ? "none" : ""}}>Cancel</Button>
                    <Button variant="primary" onClick={handleClose}
                            style={{display: (!showButton) ? "" : "none"}}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CreateColor;