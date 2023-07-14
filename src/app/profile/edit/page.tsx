import { ProfileEditPage } from "@/ui/pages";
import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'LL NFT | Edit Profile',
  description: 'Edit your LL NFT profile!',
}

export default function ProfileEdit() {
    return (
        <main>
            <ProfileEditPage />
        </main>
    );
}
