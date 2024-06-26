import { useEffect, useState } from "react";
import { closeModal, entry, updateAppointmentDrawingHall } from "./Lib";

export default function Edit(props) {
    const [done_, setDone_] = useState(false);
    const [deleted_, setDeleted_] = useState(false);
    const [importance, setImportance] = useState(0);
    const [data, setData] = useState({});

    const importanceMap = {
        3: "Assignment",
        2: "Quiz",
        1: "Mid Exam",
        0: "End Exam"
    };


    const editApp = (e) => {
        const name_ = e.target.name;
        let v_ = e.target.value;

        if (name_ === "done") {
            v_ = e.target.checked;
            setDone_(v_);
        }

        if (name_ === "deleted") {
            v_ = e.target.checked;
            setDeleted_(v_);
        }

        if (name_ === "date") {
            v_ = new Date(v_);
        }

        if (name_ === "levelOfImportance") {
            v_ = Number(v_);
            setImportance(v_);
        }

        entry[name_] = v_;
    };

    const sendEmail = async () => {
        const emailRequest = {
            toEmail: entry.lectureName,  // Assuming lectureName is the email address
            subject: "Drawing ExamHall Booking Confirmed",
            body: `
            Your time slot from ${entry.time} to ${entry.endTime} on ${entry.date.split("T")[0]} is confirmed for ${importanceMap[data.levelOfImportance]}.
            <br>
               <br>
            Details:   <br>
            - Exam Hall: ${entry.examHall}    <br>
            - Date: ${entry.date.split("T")[0]}    <br>
            - Time: ${entry.time} - ${entry.endTime}    <br>
            - Batch: ${entry.year}    <br>
            - Subject: ${entry.subject}    <br>
            - Exam Type: ${importanceMap[data.levelOfImportance]}    <br>
            - Semester: ${entry.semester}    <br>
            - Supporting Academic Staff Member: ${entry.academicStaff}     
               <br>
                  <br>
            Thank you for your attention.
        `
        };

        try {
            const response = await fetch("/SendMail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(emailRequest)
            });

            if (!response.ok) {
                throw new Error("Failed to send email");
            }

            console.log("Email sent successfully");
        } catch (error) {
            console.error("Error sending email:", error);
        }
    };

    const updateApp = () => {
        updateAppointmentDrawingHall(entry)
            .then(r => {
                console.log("Updated successfully: ", r);
                props.refreshApp(Math.random() * 248 * Math.random());
                sendEmail();  // Send email after successful update
            })
            .catch(e => console.log("Could not update the appointment: ", e));

        closeModal("edit-modal");
        window.location.reload();
        window.location.reload();
    };

    const defaultDate = typeof (entry.date) === "string" ? entry.date.split("T")[0] : "";

    useEffect(() => {
        setDone_(entry.done);
        setDeleted_(entry.deleted);
        setImportance(entry.levelOfImportance);
        setData(entry);
    }, [props.stateListener]);

    return (
        <div className="modal-container">
            <div className="modal-title">Edit Booking</div>

            <div className="mt-15">
                <label htmlFor="Description_e">Lecturer Email Address&nbsp; :</label>
                <input id="Description_e" maxLength={50} className="mt-5" name="lectureName" defaultValue={data.lectureName} onChange={editApp} style={{ width: '250px' }}></input> <br />
            </div>

            <div className="mt-15">
                <div>
                    <label htmlFor="Address_e"> Non Academic   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</label>
                    <input type="text" id="Address_e" name="academicStaff" maxLength={50} defaultValue={data.academicStaff} onChange={editApp} style={{ width: '250px' }} /><br></br>
                    <label>Staff Member</label>
                </div>
            </div>
            <br></br>
            <div className="ms-10">
                <label htmlFor="LevelOfImportance_e">Exam Type &nbsp;:</label>
                <select name="levelOfImportance" id="LevelOfImportance_e" value={importance} onChange={editApp}>
                    <option value={3}>Assignment</option>
                    <option value={2}>Quiz</option>
                    <option value={1}>Mid Exam</option>
                    <option value={0}>End Exam</option>
                </select>
            </div>
            <br></br>
            <br></br>
            <div className="form-container">
                <div className="form-row">
                    <div className="form-field">
                        <label htmlFor="Title_e">Number Of Student :</label> <br />
                        <input type="text" className="mt-5" id="Title_e" maxLength="2" name="numOfStudent" defaultValue={data.numOfStudent} onChange={editApp} />
                    </div>
                    <div className="form-field">
                        <label htmlFor="Title_e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Batch :</label> <br />
                        <input type="text" className="mt-5" id="Title_e" name="year" defaultValue={data.year} onChange={editApp} />
                    </div>
                    <div className="form-field">
                        <label htmlFor="Title_e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Semester :</label> <br />
                        <input type="text" className="mt-5" id="Title_e" name="semester" defaultValue={data.semester} onChange={editApp} />
                    </div>
                    <br></br>
                    <div className="form-field">
                        <label htmlFor="Title_e">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Subject :</label> <br />
                        <input type="text" className="mt-5" id="Title_e" maxLength={6} name="subject" defaultValue={data.subject} onChange={editApp} />
                    </div>
                </div>
            </div>
            <div>
                <div className="ms-20">

                    <label htmlFor="Date_e">Date &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</label>
                    <input type="date" id="Date_e" name="date" onChange={editApp} defaultValue={defaultDate} />
                </div>
                <br></br>
                <div className="ms-20">
                    <label htmlFor="Time_e">Start Time &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</label>
                    <input type="time" id="Time_e" name="time" onChange={editApp} defaultValue={data.time} />
                </div>
                <br></br>
                <div className="ms-20">
                    <label htmlFor="Time_e">End Time &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</label>
                    <input type="time" id="Time_e" name="endTime" onChange={editApp} defaultValue={data.endTime} />
                </div>
                <br></br>
                <div className="ms-20 items-center">
                    <label htmlFor="Done_e">Accept</label>
                    <input type="checkbox" id="Done_e" name="done" checked={done_} onChange={editApp} />
                </div>
            </div>
            <div className="justify-btw modal-action-container mt-15">
                <div className="btn" onClick={() => closeModal("edit-modal")}>Cancel</div>
                <div className="btn" onClick={updateApp}>Confirm</div>
            </div>
        </div>
    );
}