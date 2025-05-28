import type {Metadata} from "next";

export default async function Page({params}: {params: Promise<{ id: string }>})
{
    const {id} = await params;
    return (
        <div>
            review details {id}
        </div>
    )
}

export const metadata: Metadata = {
    title: "Reviews",
};