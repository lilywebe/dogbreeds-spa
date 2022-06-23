/*
Name: Kavin Thakkar
Date: 6-22-22
File: deleteColor.js
Description: this script creates a component for deleting a color
*/

import React from 'react';
import {useState, useEffect} from "react";
import UseFetch from "../../services/useFetch";
import {Button, Modal} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import JSONPretty from "react-json-pretty";

const DeleteColor = ({showModal, setShowModal, data, reload, setReload, setSubHeading}) => {
    const {error, isLoading, data: response, remove} = UseFetch();
    const [showButton, setShowButton] = useState(true);
    const navigate = useNavigate();

    const handleDelete = () => {
        remove(data.colorID);
        setShowButton(false);
    }

    const handleCancel = () => {
        setShowModal(false);
        setSubHeading("All Colors");
        navigate("/colors");
    }

    const handleClose = () => {
        setShowModal(false);
        setShowButton(true);
        setReload(!reload);
        setSubHeading("All Colors");
        navigate("/colors");
    }

    return (
        <div>
            <Modal show={showModal} onHide={handleClose} centered animation={false} backdrop="static">
                <Modal.Header closeButton>
                    <h4>Delete Color</h4>
                </Modal.Header>
                <Modal.Body>
                    {error && <JSONPretty data={error} style={{color: "red"}}></JSONPretty>}
                    {isLoading &&
                    <div className="image-loading">
                        Please wait while data is being loaded
                        <img src={require(`../loading.gif`)} alt="Loading ......"/>
                    </div>
                    }
                    {response
                        ? <JSONPretty data={response}></JSONPretty>
                        : <div>
                            <span style={{color: "red"}}>Are you sure you want to delete the following color?</span>
                            <span><JSONPretty data={data} ></JSONPretty></span>
                        </div>
                    }
                </Modal.Body>
                <Modal.Footer style={{justifyContent: "center"}}>
                    <Button variant="danger" onClick={handleDelete}
                            style={{display: (!showButton) ? "none" : ""}}>Remove</Button>
                    <Button variant="secondary" onClick={handleCancel}
                            style={{display: (!showButton) ? "none" : ""}}>Cancel</Button>
                    <Button variant="primary" onClick={handleClose}
                            style={{display: (!showButton) ? "" : "none"}}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DeleteColor;