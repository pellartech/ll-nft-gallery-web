"use client";
import ProfileForm from "@/components/profile-form";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { useAccount } from "wagmi";

export default function ProfileEdit() {
    const { address } = useAccount();
    const fetchURL = `${process.env.NEXT_PUBLIC_API_URL_ROOT}/api/v1/users/${address}`;
    const { data }: any = useSWR(fetchURL, fetcher);
    return (
        <main className="text-white">
            <div className=" max-w-2xl w-screen p-2 m-auto">
                <div className="text-4xl mt-20 text-white font-semibold mb-8 flex justify-start gap-2 items-center">
                    Update Profile
                </div>

                <ProfileForm user={data?.user} />
            </div>
        </main>
    );
}
