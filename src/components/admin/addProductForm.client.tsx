"use client"

import Form from "next/form";
import {handleAddProduct, AddProductFormState} from "@/app/(admin)/admin/(products)/add/actions";
import {useActionState, useState} from "react";
import {CldUploadWidget} from "next-cloudinary";
import Image from "next/image";
import {X} from "lucide-react";
import Button from "@/components/common/button";

export default function AddProductForm({categories}) {
    const [state, formAction, isPending] = useActionState<AddProductFormState, FormData>(handleAddProduct, {
        success: false,
        message: "",
        errors: {},
        inputs: {}
    });

    // For Thumbnail
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [isThumbnailUploading, setIsThumbnailUploading] = useState(false);

    // For Images
    const [imageUrls, setImageUrls] = useState([]);
    const [areImagesUploading, setAreImagesUploading] = useState(false);

    function handleThumbnailUploadSuccess(result) {
        setThumbnailUrl(result.info.secure_url);
        setIsThumbnailUploading(false);
    }

    function handleThumbnailUploadError(error) {
        console.error("Upload failed", error);
        setIsThumbnailUploading(false);
    }

    function resetThumbnailUploader() {
        setThumbnailUrl('');
    }

    function handleImagesUploadSuccess(result) {
        if(result.event === "success" && result.info && result.info.secure_url){
            const secureUrl = result.info.secure_url;
            if(secureUrl){
                setImageUrls(prevUrls => {
                    const updatedUrls = [...prevUrls, secureUrl];

                    // Limit the imageUrls to 4
                    return updatedUrls.slice(0,4);
                })
            }
        }
        setAreImagesUploading(false);
    }

    function handleImagesUploadError(error) {
        console.error("Error uploading images ", error);
        setAreImagesUploading(false);
    }

    function removeImage(indexToRemove) {
        setImageUrls((prev) => prev.filter((_, index) => index !== indexToRemove));
    }

    function handleCancel(){
        setImageUrls([]);
        setThumbnailUrl('');
    }

    return (
        <div>
            <Form action={formAction}>
                <h2 className="text-2xl font-semibold px-71 mb-5">Details</h2>
                <div className="grid grid-cols-2 px-15 gap-y-5">
                    <div className="flex justify-center">
                        <div className="flex flex-col gap-y-1 w-100">
                            <label htmlFor="title" className="block text-md font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <input type="text" id="title" name="title"
                                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                   defaultValue={state?.inputs.title} />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex flex-col gap-y-1 w-100">
                            <label htmlFor="shortDescription" className="block text-md font-medium text-gray-700 mb-1">
                                Short Description
                            </label>
                            <input type="text" id="shortDescription" name="shortDescription"
                                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                   defaultValue={state?.inputs.short_description} />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex flex-col gap-y-1 w-100">
                            <label htmlFor="price" className="block text-md font-medium text-gray-700 mb-1">
                                Price
                            </label>
                            <input type="number" id="price" name="price"
                                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                   defaultValue={state?.inputs.price} />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex flex-col gap-y-1 w-100">
                            <label htmlFor="quantity" className="block text-md font-medium text-gray-700 mb-1">
                                Quantity
                            </label>
                            <input type="number" id="quantity" name="quantity"
                                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                   defaultValue={state?.inputs.quantity} />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex flex-col gap-y-1 w-100">
                            <label htmlFor="category" className="block text-md font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <select name="category" id="category" defaultValue={state?.inputs.category}  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent">
                                <option value="">Choose a category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="flex mt-5 px-71">
                    <div className="flex flex-col gap-y-1 w-350">
                        <label htmlFor="description" className="block text-md font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea id="description" name="description" rows={10}
                                  placeholder="Enter detailed product description here..."
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                  defaultValue={state?.inputs.description} />
                    </div>
                </div>
                <h3 className="text-xl font-semibold px-71 mb-5 mt-10">Thumbnail</h3>
                <div className="flex gap-x-5 px-71">
                    <CldUploadWidget
                        uploadPreset="digimarket_uploads"
                        onSuccess={handleThumbnailUploadSuccess}
                        onError={handleThumbnailUploadError}
                        onOpen={() => setIsThumbnailUploading(true)}
                        onClose={() => setIsThumbnailUploading(false)}
                        options={{
                            maxFiles: 1,
                            resourceType: "image",
                            clientAllowedFormats: ["jpg", "jpeg", "png", "gif", "webp"],
                            maxFileSize: 10 * 1024 * 1024, // 10MB
                            sources: ['local', 'url', 'camera']
                        }}
                    >
                        {({open, isLoading}) => (
                            <button onClick={() => {
                                open();
                            }}
                                    disabled={isLoading || isThumbnailUploading}
                                    className="cursor-pointer"
                            >
                                <div
                                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                                    {isThumbnailUploading ? 'Uploading...' : isLoading ? 'Loading...' : 'Choose Image'}
                                    <p className="text-gray-500 text-sm">Click to upload or drag and drop</p>
                                    <p className="text-gray-400 text-xs mt-1">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </button>
                        )}
                    </CldUploadWidget>

                    {/* Thumbnail Previews */}
                    <div>
                        {thumbnailUrl && (
                            <div className="border border-gray-300 rounded-lg px-3 py-1 shadow-sm">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium text-gray-700">Preview</p>
                                    <button className="cursor-pointer" onClick={resetThumbnailUploader}><X size={20}
                                                                                                           className="text-black-300 hover:text-red-500"/>
                                    </button>
                                </div>
                                <div className="relative">
                                    <Image
                                        src={thumbnailUrl}
                                        alt="Thumbnail preview"
                                        width={1000}
                                        height={1000}
                                        className="w-25 h-24 object-cover rounded-md border shadow-sm"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Hidden input to include thumbnail URL in form submission */}
                {thumbnailUrl && (
                    <input type="hidden" name="thumbnailUrl" value={thumbnailUrl}/>
                )}

                {/* For Images */}
                <h3 className="text-xl font-semibold px-71 mb-5 mt-10">Images</h3>
                <div className="flex gap-x-5 px-71">
                    <CldUploadWidget
                        uploadPreset="digimarket_uploads"
                        onSuccess={handleImagesUploadSuccess}
                        onError={handleImagesUploadError}
                        onOpen={() => setAreImagesUploading(true)}
                        onClose={() => setAreImagesUploading(false)}
                        options={{
                            maxFiles: 4 - imageUrls.length,
                            resourceType: "image",
                            clientAllowedFormats: ["jpg", "jpeg", "png", "gif", "webp"],
                            maxFileSize: 10 * 1024 * 1024, // 10MB
                            sources: ['local', 'url', 'camera'],
                            multiple: true,
                        }}
                    >
                        {({open, isLoading}) => (
                            <button type="button" onClick={() => {
                                open();
                            }}
                                    disabled={isLoading || areImagesUploading || imageUrls.length >= 4}
                                    className="cursor-pointer"
                            >
                                <div
                                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors disabled:cursor-not-allowed">
                                    {areImagesUploading ? 'Uploading...' : isLoading ? 'Loading...' : imageUrls.length >= 4 ? 'Maximum Images Reached' : 'Choose Images'}
                                    <p className="text-gray-500 text-sm">Click to upload or drag and drop</p>
                                    <p className="text-gray-400 text-xs mt-1">PNG, JPG, GIF up to 10MB <br/> You can
                                        upload upto 4 images </p>
                                </div>
                            </button>
                        )}
                    </CldUploadWidget>

                    {/* Image Previews */}
                    <div>
                        {imageUrls.length > 0 && (
                            <div className="rounded-lg px-3 py-1">
                                <div className="relative">
                                    <div className="flex gap-x-4">
                                        {imageUrls.map((url, index) => (
                                            <div className="border border-gray-300 shadow-sm rounded-lg px-3 py-1" key={index}>
                                                <div className="flex justify-between items-center">
                                                    <p className="text-sm font-medium text-gray-700">{index + 1}</p>
                                                    <button className="cursor-pointer" onClick={() => {
                                                        removeImage(index)
                                                    }}><X size={20}
                                                          className="text-black-300 hover:text-red-500"/>
                                                    </button>
                                                </div>
                                                <Image src={url} alt={`Product image ${index + 1}`} width={1000}
                                                       height={1000}
                                                       className="w-25 h-24 object-cover rounded-md border shadow-sm"/>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* Hidden input to include imageUrls in form submission */}
                {imageUrls.map((url,index) => (
                    <input key={index} type="hidden" name={`image_${index}`} value={url} />
                ))}

                {(state?.success === false && state.message) && (
                    <div className="px-71">
                        <div className='text-red-500 text-xl border border-red-300 rounded-sm px-2 py-1 mt-2 w-100 text-sm'>
                            {state.message}
                        </div>
                    </div>
                )}
                <div className="flex px-71 mt-15 mb-10 gap-x-10">
                    <Button type="submit" disabled={isPending} variant="primary" size="md">{isPending ? 'Submitting...' : 'Submit'}</Button>
                    <Button type="reset" onClick={handleCancel} variant="destructive" size="md">Cancel</Button>
                </div>
            </Form>
        </div>
    );
}
