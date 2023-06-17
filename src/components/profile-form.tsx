'use client'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { updateProfile } from '@/lib/api'

type FormData = {
    name?: string,
    bio?: string,
    twitter?: string,
    instagram?: string,
    discord?: string
}

export default function ProfileForm({ user }: { user?: FormData }) {
    // const { token } = useSWR("lightlink-web-token", storage)
    const token = window.localStorage.getItem("lightlink-web-token")

    const schema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        bio: Yup.string().required('Bio is required'),
        twitter: Yup.string().required('Twitter is required'),
        instagram: Yup.string().required('Instagram is required'),
        discord: Yup.string().required('Discord is required')
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data: FormData) => {
        const result = await updateProfile(token, data.name, data.bio, data.twitter, data.instagram, data.discord)
        if (result) {
            console.log("updated:", result.data)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        This information will be displayed publicly so be careful what you share.
                    </p>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="sm:col-span-4">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        defaultValue={user?.name}
                                        {...register('name')}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="janesmith"
                                    />

                                </div>
                                {/* <p>{errors.name?.message}</p> */}
                            </div>
                        </div>
                    </div>

                    <div className="col-span-full">
                        <label htmlFor="bio" className="block text-sm font-medium leading-6 text-gray-900">
                            Bio
                        </label>
                        <div className="mt-2">
                            <textarea
                                rows={3}
                                defaultValue={user?.bio}
                                {...register('bio')}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {/* <p>{errors.bio?.message}</p> */}
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                    </div>

                    <div className="sm:col-span-4">
                        <label htmlFor="twitter" className="block text-sm font-medium leading-6 text-gray-900">
                            Twitter
                        </label>
                        <div className="mt-2">
                            <input
                                {...register('twitter')}
                                defaultValue={user?.twitter}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {/* <p>{errors.twitter?.message}</p> */}
                        </div>
                    </div>
                    <div className="sm:col-span-4">
                        <label htmlFor="instagram" className="block text-sm font-medium leading-6 text-gray-900">
                            Instagram
                        </label>
                        <div className="mt-2">
                            <input
                                {...register('instagram')}
                                defaultValue={user?.instagram}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {/* <p>{errors.instagram?.message}</p> */}
                        </div>
                    </div>
                    <div className="sm:col-span-4">
                        <label htmlFor="discord" className="block text-sm font-medium leading-6 text-gray-900">
                            Discord
                        </label>
                        <div className="mt-2">
                            <input
                                {...register('discord')}
                                defaultValue={user?.discord}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {/* <p>{errors.discord?.message}</p> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save
                </button>
            </div>
        </form>
    )
}