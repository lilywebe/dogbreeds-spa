//Lily Weber 6-20-2022
import {settings} from "../../config/config";
import {useAuth} from "../../services/useAuth";
import useAxios from "../../services/useAxios";
import {useParams, useNavigate} from "react-router-dom";
import {Modal, Button} from 'react-bootstrap';
import "./breed.css";



const Breed = ({show, setShow}) => {

    const {breedID} = useParams();
    const url = settings.baseApiUrl + "/breeds/" + breedID;
    const {user} = useAuth();
    const navigate = useNavigate();
    const handleClose = () => {setShow(false); navigate("/breeds")};

//fetch course data using the useAxios hook
    const {
        error,
        isLoading,
        data: breed
    } = useAxios(url, "GET", {Authorization: "Bearer " + user.jwt});

    return (
        <>

            <Modal show={show} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton>
                    <h4>{breed && breed.name}</h4>
                </Modal.Header>
                <Modal.Body>
                    {error && <div>{error}</div>}
                    {isLoading &&
                    <div className="image-loading">
                        Please wait while data is being loaded
                        <img src={require(`../loading.gif`)} alt="Loading ......"/>
                    </div>
                    }
                    {breed &&
                    <div className="course-detail-container">
                        <div className="course-detail-row">
                            <div>Name</div><div>{breed.name}</div>
                        </div>
                        <div className="course-detail-row">
                            <div>Size ID</div><div>{breed.sizeID}</div>
                        </div>
                        <div className="course-detail-row">
                            <div>Category ID</div><div>{breed.categoryID}</div>
                        </div>
                        <div className="course-detail-row">
                            <div>Temperament ID</div><div>{breed.temperamentID}</div>
                        </div>
                        <div className="course-detail-row">
                            <div>Origin ID</div><div>{breed.originID}</div>
                        </div>
                    </div>
                    }
                </Modal.Body>
                <Modal.Footer style={{borderTop: "none"}}>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>

        </>
    );
};

export default Breed;