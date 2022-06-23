//Daniel Todd
//6-20-2022
//colors.js
//creates the colors component

import React from 'react';
import {useEffect, useState} from 'react';
import UseFetch from "../../services/useFetch";
import JSONPretty from 'react-json-pretty';
import "./color.css";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../services/useAuth";
import EditColor from './editColor';
import CreateColor from './createColor';
import DeleteColor from './deleteColor';

const Colors = () => {
    const {error, isLoading, data: colors, getAll, search} = UseFetch();
    const [subHeading, setSubHeading] = useState("All Colors");
    const navigate = useNavigate();
    const [activeColor, setActiveColor] = useState(""); //the color being edited
    const [showEditModal, setShowEditModal] = useState(false);
    const [reload, setReload] = useState(false);

    const {user} = useAuth();
    const disabled = (user.role !== 1);

    useEffect(() => {
        getAll();
    }, [reload]);

    const handleSearch = (e) => {
        e.preventDefault();
        const term = document.getElementById("color-search-term").value;
        if(term === '')
            setSubHeading("All Colors");
        else if(isNaN(term))
            setSubHeading("Colors containing '" + term + "'");
        search(term);
    }

    const clearSearchBox = (e) => {
        e.preventDefault();
        document.getElementById("color-search-term").value = "";
        search("");
    }

    const handleEdit = (e) => {
        if(disabled) return;
        //retrieve color data and pass it to the update page
        let color = {};
        ["colorID", "colorName"].forEach(function(key)
        {
            color[key] =
                document.getElementById(`color-${key}-` + e.target.colorID).innerText;
        })
        setActiveColor(color);
        navigate("/colors/" + e.target.colorID);
        setShowEditModal(true);
        setSubHeading("Edit Color");
    }

    const [showCreateModal, setShowCreateModal] = useState(false);
    const handleCreate = (e) => {
        if(disabled) return;
        setShowCreateModal(true);
        setSubHeading("Create Color");
    }

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = (e) => {
        if(disabled) return;
        let color = {};
        ["colorID", "colorName"].forEach(function (key)
        {
            color[key] =
                document.getElementById(`color-${key}-` + e.target.colorID).innerText;
        })
        setActiveColor(color);
        setSubHeading("Delete Color");
        navigate("/colors/" + e.target.colorID);
        setShowDeleteModal(true);
    }

    return (
        <>
            <div className="main-heading">
                <div className="container">Color</div>
            </div>
            <div className="sub-heading">
                <div className="container">{subHeading}</div>
            </div>
            <div className="main-content container">
                {error && <JSONPretty data={error}></JSONPretty>}
                {isLoading &&
                    <div className="image-loading">
                        Please wait while data is being loaded
                        <img src={require(`../loading.gif`)} alt="Loading ......"/>
                    </div>}
                {colors &&
                    <div className="color-container">
                        <form style={{textAlign: "right", marginBottom: "3px"}} onSubmit={handleSearch}>
                            <input id="color-search-term" placeholder="Enter search terms"/>
                            <button type="submit" className="button-light"
                                    style={{marginLeft: "5px"}}>Search</button>
                            <button className="button-light" style={{marginLeft: "5px"}}
                                    onClick={clearSearchBox}>Clear</button>
                        </form>
                        <div className="color-row color-row-header">
                            <div className="color-info">
                                <div className="color-id">Color ID</div>
                                <div className="color-name">Color Name</div>
                            </div>
                            <div className="color-buttons" style={{textAlign: "center"}}>Actions</div>
                        </div>
                        {colors.map((color) => (
                            <div key={color.colorID} className="color-row">
                                <div className="color-info">
                                    <div id={"color-id-" + color.colorID} className="color-id">{color.colorID}</div>
                                    <div id={"color-name-" + color.colorID} className="color-name">{color.colorName}</div>
                                </div>
                                <div className="color-buttons">
                                    <button
                                        className="button-light"
                                        disabled={disabled}
                                        onClick={handleEdit}>Edit
                                    </button>
                                    <button
                                        className="button-light"
                                        id={color.colorID}
                                        disabled={disabled}
                                        onClick={handleDelete}>Delete
                                    </button>

                                </div>
                            </div>
                        ))}
                    </div>}
                {showEditModal &&
                    <EditColor
                        showModal={showEditModal}
                        setShowModal={setShowEditModal}
                        data={activeColor}
                        reload={reload}
                        setReload={setReload}
                        setSubHeading={setSubHeading}/>}

                {showDeleteModal &&
                    <DeleteColor
                        showModal={showDeleteModal}
                        setShowModal={setShowDeleteModal}
                        data={activeColor}
                        reload={reload}
                        setReload={setReload}
                        setSubHeading={setSubHeading}/>}

                {showCreateModal &&
                <CreateColor
                    showModal={showCreateModal}
                    setShowModal={setShowCreateModal}
                    reload={reload}
                    setReload={setReload}
                    setSubHeading={setSubHeading}/>}
                <div>
                    <button
                        className="button-create"
                        disabled={disabled}
                        onClick={handleCreate}>Create Color
                    </button>
                </div>
            </div>
        </>
    );
};

export default Colors;