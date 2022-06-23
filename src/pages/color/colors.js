//Lily Weber6/22/2022
import {useEffect, useState} from 'react';
import UseFetch from "./useFetch";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../services/useAuth";
import EditColor from "./editColor";
import JSONPretty from 'react-json-pretty';
import CreateColor from "./createColor";
import DeleteColor from "./deleteColor";
import './color.css';



const Colors = () => {

    const {error, isLoading, data: colors, getAll} = UseFetch();
    const [subHeading, setSubHeading] = useState("All Colors");

    useEffect(() => {
        getAll();
    }, []);


    const navigate = useNavigate();
    const [activeColor, setActiveColor] = useState("");  //the color being edited
    const [showEditModal, setShowEditModal] = useState(false);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        getAll();
    }, [reload]);

    const {user} = useAuth();
    const disabled = (user.role !== 1);

    const handleEdit = (e) => {
        if(disabled) return;

        //retrieve student data and pass it to the update page
        let color = {};
        ["id", "name"].forEach(function(key)
        {
            let id = `student-${key}-` + e.target.attributes["data-id"].value;
            console.log(id);
            color[key] = document.getElementById(id).innerText;
        })
        setActiveColor(color);
        navigate("/colors/" + e.target.id);
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
        ["id", "name"].forEach(function (key)
        {
            let id = `student-${key}-` + e.target.attributes["data-id"].value;
            console.log(id);
            color[key] = document.getElementById(id).innerText;
        })
        setActiveColor(color);
        navigate("/colors/" + e.target.id);
        setShowDeleteModal(true);
        setSubHeading("Delete Color");

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
                <div className="student-container">
                    <div className="student-row student-row-header">
                        <div className="student-info">
                            <div className="student-id">Color ID</div>
                            <div className="student-name">Color Name</div>
                        </div>
                        <div className="student-buttons" style={{textAlign: "center"}}>Actions</div>
                    </div>
                    {colors.map((color) => (
                        <div key={color.colorID} className="student-row">
                            <div className="student-info">
                                <div id={"student-id-" + color.colorID} className="student-id">{color.colorID}</div>
                                <div id={"student-name-" + color.colorID} className="student-name">{color.colorName}</div>
                            </div>

                            <div className="student-buttons">
                                <button
                                    className="button-light"
                                    data-id={color.colorID}
                                    disabled={disabled} onClick={handleEdit}>Edit</button>
                                <button className="button-light" data-id={color.colorID} disabled={disabled}
                                        onClick={handleDelete}>Delete</button>
                            </div>
                        </div>
                    ))}

                    {showEditModal &&
                    <EditColor
                        showModal={showEditModal}
                        setShowModal={setShowEditModal}
                        data={activeColor}
                        reload={reload}
                        setReload={setReload}
                        setSubHeading={setSubHeading}/>}

                    {showDeleteModal &&
                    <DeleteColor showModal={showDeleteModal} setShowModal={setShowDeleteModal}
                                   data={activeColor} reload={reload} setReload={setReload}
                                   setSubHeading={setSubHeading}/>}

                    {showCreateModal &&
                    <CreateColor
                        showModal={showCreateModal}
                        setShowModal={setShowCreateModal}
                        reload={reload}
                        setReload={setReload}
                        setSubHeading={setSubHeading}/>}
                    <div>
                        <button className="button-create" disabled={disabled} onClick={handleCreate}>
                            Create Color
                        </button>
                    </div>

                </div>}
            </div>

        </>
    );
};

export default Colors;