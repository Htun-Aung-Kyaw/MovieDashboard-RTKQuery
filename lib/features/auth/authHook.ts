import {useAppSelector} from "@/lib/hooks";
import {selectAuth} from "@/lib/features/auth/authSlice";

export default function authHook()
{
    const auth: string = useAppSelector(selectAuth);
    return auth;
}