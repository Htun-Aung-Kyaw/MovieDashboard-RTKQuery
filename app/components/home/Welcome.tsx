'use client';
import IsAuth from "@/app/components/auth/IsAuth";

function Welcome() {
    return (
        <h1>
            Welcome to Movie Dashboard!
        </h1>
    );
}

export default IsAuth(Welcome);