import React from "react";
import { useNavigate } from "react-router-dom";

const CreateRoom = ({handleRoomIdChange}) => {
    const navigate = useNavigate();
    const create = async (e) => {
        e.preventDefault();
        console.log("create");

        const resp = await fetch("http://localhost:9000/create");
        const { room_id } = await resp.json();

        // pass room_id to parent component
        handleRoomIdChange(room_id);
    };

    return (
        <div>
            <button onClick={create} className="mx-6 mb-4 items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white">Video Chat</button>
        </div>
    );
};

export default CreateRoom;