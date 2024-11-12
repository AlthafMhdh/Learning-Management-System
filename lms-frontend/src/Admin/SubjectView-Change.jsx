import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoArrowBack } from "react-icons/io5";
import { useHistory, useNavigate, useLocation } from "react-router-dom";
import { IoArrowBackSharp, IoArrowForward } from "react-icons/io5";
import { Modal, Button } from "react-bootstrap";

const BackButton = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
       // navigate("/admin/subjectview");
       navigate(-1);
    };

    return (
        <label style={{ paddingLeft: "25px" }} onClick={handleGoBack}>
            <IoArrowBack size={27} />
        </label>
    );
};

const ChangeSubjectView = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [subjects, setSubjects] = useState([]);
    const [allSubjectsChecked, setAllSubjectsChecked] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [selectedSubjectIds, setSelectedSubjectIds] = useState([]);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const courseId = queryParams.get("courseId");
    const subjectIds = queryParams.getAll("subjectIds");

    console.log("ID:",courseId);
    console.log("SId:",subjectIds);

    useEffect(() => {
        axios
            .get("http://localhost:8083/api/v1/subject/allsubjects")
            .then((response) => {
                if (Array.isArray(response.data.data)) {
                    setSubjects(response.data.data);
                } else {
                    console.error("Invalid data format from the backend:", response.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching subjects data:", error);
            });
    }, []);

    const handleAllSubjectsCheckboxChange = (event) => {
        const isChecked = event.target.checked;
        setAllSubjectsChecked(isChecked);
        const subjectIds = subjects.map((subject) => subject.subjectId);
        setSelectedSubjectIds(isChecked ? subjectIds : []);
    };

    const handleSubjectCheckboxChange = (event) => {
        const subjectId = parseInt(event.target.value);
        const isChecked = event.target.checked;

        setSelectedSubjectIds((prevSelectedSubjectIds) => {
            if (isChecked) {
                return [...prevSelectedSubjectIds, subjectId];
            } else {
                return prevSelectedSubjectIds.filter((id) => id !== subjectId);
            }
        });
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div>
            <section className="formheader1">
                <BackButton />
                <h4 style={{ paddingLeft: "100px" }}>Subject Name</h4>
            </section>

            <div className="table-responsive-sm" style={{ marginTop: "25px", marginLeft: "300px", width: "40%", height: "485px" }}>
                <table className="table">
                    <tbody>
                        {subjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((subject) => (
                            <tr key={subject.subjectId}>
                                <td>
                                    <input
                                        type="checkbox"
                                        style={{ transform: "scale(1.3)" }}
                                        name={`subject_${subject.subjectId}`}
                                        value={subject.subjectId}
                                        onChange={handleSubjectCheckboxChange}
                                        checked={selectedSubjectIds.includes(subject.subjectId)}
                                    />
                                </td>
                                <td>{subject.subjectName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination2">
                <button className="buttonpd" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    <IoArrowBackSharp />
                </button>
                <span className="buttonpd">{currentPage}</span>
                <button
                    className="buttonpd"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage * itemsPerPage >= subjects.length}
                >
                    <IoArrowForward />
                </button>
            </div>

            <div style={{ marginTop: "40px", marginLeft: "510px" }}>
                <button className="btn btn-primary" onClick={() => setShowConfirmationModal(true)}>
                    Confirm Changes
                </button>
            </div>

            {/* Confirmation Modal */}
            <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)} centered>
                <Modal.Header>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to change this course's subjects?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShowConfirmationModal(false)} style={{ width: "15%" }}>
                        No
                    </Button>
                    <Button
                        variant="success"
                        onClick={() => {
                            // Implement your confirmation action here
                            // For now, let's just close the modal
                            setShowConfirmationModal(false);
                        }}
                        style={{ width: "15%" }}
                    >
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ChangeSubjectView;
