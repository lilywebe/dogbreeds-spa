//Lily Weber 6/22/2022

import {useState, useEffect} from "react";
import UseFetch from "./useFetch";
import {Button, Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";
import JSONPretty from "react-json-pretty";
import "./color.css";



const CreateColor = ({showModal, setShowModal, reload, setReload, setSubHeading}) => {

    const {error, isLoading, data: response, create} = UseFetch();
    const [submitted, setSubmitted] = useState(false);
    const [showButton, setShowButton] = useState(true);

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {id: "", name: ""},
        shouldUseNativeValidation: false
    });

    const createFormOptions = {
        id: {required: "ID is required"},
        name: {required: "Name is required"}
    }

    const handleCreate = (color) => {
        create({"colorID": color.id, "colorName": color.name});
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
                    <h4>Create Color</h4>
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
                    <form className="form-student" id="form-student-edit" onSubmit={handleSubmit(handleCreate)}>
                        <ul className="form-student-errors">
                            {errors?.id && <li>{errors.id.message}</li>}
                            {errors?.name && <li>{errors.name.message}</li>}

                        </ul>
                        <div className="form-group">
                            <label>Color ID</label>
                            <input name="id" {...register('id', createFormOptions.id)}/>
                        </div>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" name="name" {...register('name', createFormOptions.name)}/>
                        </div>
                    </form>
                    }
                </Modal.Body>
                <Modal.Footer style={{justifyContent: "center"}}>
                    <Button variant="primary" form="form-student-edit" type="submit"
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