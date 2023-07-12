import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { updateProfile } from '@/lib/api'
import Input from './input'
import { useRouter } from 'next/navigation'
import Button from './button'

type FormData = {
    name?: string,
    bio?: string,
    wallet_address?: string,
    twitter?: string,
    instagram?: string,
    discord?: string
}

export default function ProfileForm({ user }: { user?: FormData }) {
    const router = useRouter()

    const schema = Yup.object().shape({
        name: Yup.string().required('Name is required')
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data: FormData) => {
        const token = window.localStorage.getItem("lightlink-web-token")
        const result = await updateProfile(token, data.name, data.bio, data.twitter, data.instagram, data.discord)
        if (result) {
            router.push(`/profile/${user?.wallet_address}`)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-12">
                <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Your Details</h2>

                    <Input type="text" label="Username" name="name" placeholder="Enter username" defaultValue={user?.name} register={register} error={errors.name?.message?.toString()} />
                    <Input type="textarea" label="Bio (optional)" placeholder="Add a few words about yourself" name="bio" defaultValue={user?.bio} register={register} error={errors.bio?.message?.toString()} />
                    <Input type="text" label="Wallet Address" name="address" placeholder="janesmith" defaultValue={user?.wallet_address} register={register} />

                    <div className="flex items-center mt-4"><h2 className="text-base font-semibold leading-7 text-gray-900">Social Connections</h2><div className="text-sm text-white ml-1">(optional)</div></div>

                    <Input icon={<img src="/images/icons/twitter.svg" alt="" />} placeholder="Twitter" type="text" name="twitter" defaultValue={user?.twitter} register={register} error={errors.twitter?.message?.toString()} />
                    <Input icon={<img src="/images/icons/instagram.svg" alt="" />} type="text" placeholder="Instagram" name="instagram" defaultValue={user?.instagram} register={register} error={errors.instagram?.message?.toString()} />
                    <Input icon={<img src="/images/icons/web.svg" alt="" />} type="text" name="discord" placeholder="Enter website URL" defaultValue={user?.discord} register={register} error={errors.discord?.message?.toString()} />
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Button type="submit">Save Edits</Button>
            </div>
        </form>
    )
}
