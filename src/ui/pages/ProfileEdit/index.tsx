"use client";
import ProfileForm from "@/ui/components/profile-form";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { useAccount } from "wagmi";

const ProfileEditPage = () => {
    const { address } = useAccount();
    const fetchURL = `${process.env.NEXT_PUBLIC_API_URL_ROOT}/api/v1/users/${address}`;
    const { data }: any = useSWR(fetchURL, fetcher);
    return (
        <div className=" max-w-2xl w-screen p-2 m-auto">
            <div className="text-4xl mt-20 text-white font-semibold mb-8 flex justify-start gap-2 items-center">
                Update Profile
            </div>

            <ProfileForm user={data?.user} />
        </div>
    );
}

export default ProfileEditPage