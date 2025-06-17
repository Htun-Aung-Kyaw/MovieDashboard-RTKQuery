"use client";

import UserForm from "@/app/components/user/UserForm";

export default function Page()
{
    return (
        <div className="w-50">
            <h3 className={"mb-3"}>Login Form</h3>
            <UserForm/>
        </div>
    );
}