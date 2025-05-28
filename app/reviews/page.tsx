import type {Metadata} from "next";
import ReviewList from "@/app/components/reviews/ReviewList";


export default function Page()
{
    return (
        <div className="uiContainer">
            {/*<NewReview/>*/}
            <ReviewList/>
        </div>
    )
}

export const metadata: Metadata = {
    title: "Reviews",
};