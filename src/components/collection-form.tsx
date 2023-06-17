'use client'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { updateCollection } from '@/lib/api'
import { useRouter } from 'next/navigation'
import Image from 'next/image'


type FormData = {
    contract_address?: string,
    name?: string,
    description?: string,
    website?: string,
    twitter?: string,
    instagram?: string,
    discord?: string,
    logo?: object,
    background?: object

}

export default function CollectionForm({ collection }: { collection?: any }) {
    const router = useRouter()
    const [logo, setLogo] = useState(null)
    const [background, setBackground] = useState(null)
    const [isPending, setIsPending] = useState(false)


    const schema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required'),
        website: Yup.string().required('Twitter is required'),
        twitter: Yup.string().optional(),
        instagram: Yup.string().optional(),
        discord: Yup.string().optional()
    })

    const uploadLogo = (event: any) => {
        setLogo(event.target.files[0])
    }
    const uploadBackground = (event: any) => {
        setBackground(event.target.files[0])
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (formData: any) => {
        setIsPending(true)
        const result = await updateCollection(
            collection?.contract_address!,
            formData?.name!,
            formData?.description!,
            formData?.website!,
            formData?.twitter!,
            formData?.instagram!,
            formData?.discord!,
            logo,
            background)
        if (result) {
            return router.push(`/collections/${collection?.contract_address!}`)
        }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Update Collection</h2>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        {...register('name')}
                                        defaultValue={collection?.name}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="janesmith"
                                    />
                                </div>
                            </div>
                            {/* <p>{errors.name?.message}</p> */}
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    {...register('description')}
                                    defaultValue={collection?.description}
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {/* <p>{errors.description?.message}</p> */}
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about this Collection.</p>
                        </div>


                        <div className="col-span-full">
                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                Logo
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg ">
                                {
                                    collection?.logo ? <Image alt="" className="object-cover h-128 w-128 rounded-t-md" src={`${process.env.NEXT_PUBLIC_S3_BASEURL}/${collection.logo && collection.logo.small}`} />
                                        : <></>
                                }


                            </div>
                            <input id="logo" name="logo" type="file" accept="image/png, image/jpeg, image/gif" onChange={uploadLogo} />
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                Background
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg ">
                                {
                                    collection?.background ? <Image alt="" className="object-cover h-128 w-128 rounded-t-md" src={`${process.env.NEXT_PUBLIC_S3_BASEURL}/${collection.background && collection.background.small}`} />
                                        : <></>
                                }
                            </div>
                            <input id="background" name="background" type="file" accept="image/png, image/jpeg, image/gif" onChange={uploadBackground} />
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                                Website
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register('website')}
                                    defaultValue={collection?.website}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {/* <p>{errors.website?.message}</p> */}
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="twitter" className="block text-sm font-medium leading-6 text-gray-900">
                                Twitter
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register('twitter')}
                                    defaultValue={collection?.twitter}
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
                                    defaultValue={collection?.instagram}
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
                                    defaultValue={collection?.discord}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {/* <p>{errors.discord?.message}</p> */}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {isPending ? 'Updating...' : 'Save'}
                </button>
            </div>
        </form>
    )
}