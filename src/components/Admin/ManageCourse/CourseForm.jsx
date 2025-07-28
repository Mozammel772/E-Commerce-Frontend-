"use client"

import { useState } from "react"
import { Save, X, Upload, Loader2, Tag, Plus, AlertCircle } from "lucide-react"

const CourseForm = ({ course, onSubmit, onCancel, isEditing = false, isLoading = false }) => {
    const [formData, setFormData] = useState({
        title: course?.title || "",
        slug: course?.slug || "",
        description: course?.description || "",
        price: course?.price || "",
        duration: course?.duration || "",
        level: course?.level || "Beginner",
        category: course?.category || "",
        thumbnailUrl: course?.thumbnailUrl || "",
        instructor: course?.instructor || {
            name: "",
            email: "",
            bio: "",
            avatarUrl: "",
        },
        tags: course?.tags || [],
    })

    const [thumbnailFile, setThumbnailFile] = useState(null)
    const [thumbnailPreview, setThumbnailPreview] = useState(course?.thumbnailUrl || "")
    const [errors, setErrors] = useState({})
    const [newTag, setNewTag] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target

        if (name.includes(".")) {
            // Handle nested objects like instructor.name
            const [parent, child] = name.split(".")
            setFormData({
                ...formData,
                [parent]: {
                    ...formData[parent],
                    [child]: value,
                },
            })
        } else {
            setFormData({
                ...formData,
                [name]: value,
            })
        }

        // Clear error when field is edited
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null,
            })
        }
    }

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0]
        if (!file) return

        // Validate file size (2MB limit)
        if (file.size > 2 * 1024 * 1024) {
            setErrors({
                ...errors,
                thumbnailUrl: "File size must be less than 2MB",
            })
            return
        }

        // Validate file type
        if (!file.type.startsWith("image/")) {
            setErrors({
                ...errors,
                thumbnailUrl: "Please select a valid image file",
            })
            return
        }

        // Preview the image
        const reader = new FileReader()
        reader.onload = () => {
            setThumbnailPreview(reader.result)
        }
        reader.readAsDataURL(file)
        setThumbnailFile(file)

        // Clear error if exists
        if (errors.thumbnailUrl) {
            setErrors({
                ...errors,
                thumbnailUrl: null,
            })
        }
    }

    const handleAddTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData({
                ...formData,
                tags: [...formData.tags, newTag.trim()],
            })
            setNewTag("")
        }
    }

    const handleRemoveTag = (tagToRemove) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter((tag) => tag !== tagToRemove),
        })
    }

    const generateSlug = () => {
        if (formData.title) {
            const slug = formData.title
                .toLowerCase()
                .replace(/[^\w\s]/gi, "")
                .replace(/\s+/g, "-")

            setFormData({
                ...formData,
                slug,
            })
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.title.trim()) {
            newErrors.title = "Title is required"
        }

        if (!formData.slug.trim()) {
            newErrors.slug = "Slug is required"
        }

        if (!formData.description.trim()) {
            newErrors.description = "Description is required"
        }

        if (!formData.price) {
            newErrors.price = "Price is required"
        } else if (isNaN(formData.price) || Number(formData.price) < 0) {
            newErrors.price = "Price must be a valid number"
        }

        if (!formData.duration.trim()) {
            newErrors.duration = "Duration is required"
        }

        if (!formData.category.trim()) {
            newErrors.category = "Category is required"
        }

        if (!formData.instructor.name.trim()) {
            newErrors["instructor.name"] = "Instructor name is required"
        }

        if (!formData.instructor.email.trim()) {
            newErrors["instructor.email"] = "Instructor email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.instructor.email)) {
            newErrors["instructor.email"] = "Invalid email format"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        try {
            // For demo, we'll use the preview or existing URL
            const thumbnailUrl = thumbnailPreview || formData.thumbnailUrl

            const finalFormData = {
                ...formData,
                price: Number(formData.price),
                thumbnailUrl,
                ...(isEditing && { _id: course._id, contents: course.contents }),
            }

            console.log("Course Form Data:", finalFormData)
            await onSubmit(finalFormData)
        } catch (error) {
            console.error("Error submitting form:", error)
            setErrors({
                submit: error.message || "Failed to save course. Please try again.",
            })
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {errors.submit && (
                <div className="bg-red-900/30 border border-red-700 p-4 rounded-md flex items-center gap-2">
                    <AlertCircle size={20} className="text-red-400" />
                    <span className="text-red-300">{errors.submit}</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                        Course Title*
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        onBlur={generateSlug}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-200 ${errors.title ? "border-red-500" : "border-gray-600"
                            }`}
                        placeholder="Enter course title"
                        disabled={isLoading}
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="slug" className="block text-sm font-medium text-gray-300 mb-1">
                        URL Slug*
                    </label>
                    <div className="flex">
                        <input
                            type="text"
                            id="slug"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-200 ${errors.slug ? "border-red-500" : "border-gray-600"
                                }`}
                            placeholder="course-url-slug"
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={generateSlug}
                            className="ml-2 px-3 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 disabled:opacity-50"
                            disabled={isLoading}
                        >
                            Generate
                        </button>
                    </div>
                    {errors.slug && <p className="mt-1 text-sm text-red-500">{errors.slug}</p>}
                    <p className="mt-1 text-xs text-gray-500">This will be used in the course URL</p>
                </div>

                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">
                        Price ($)*
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-200 ${errors.price ? "border-red-500" : "border-gray-600"
                            }`}
                        placeholder="99.99"
                        disabled={isLoading}
                    />
                    {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                </div>

                <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-1">
                        Duration*
                    </label>
                    <input
                        type="text"
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-200 ${errors.duration ? "border-red-500" : "border-gray-600"
                            }`}
                        placeholder="e.g. 8 weeks"
                        disabled={isLoading}
                    />
                    {errors.duration && <p className="mt-1 text-sm text-red-500">{errors.duration}</p>}
                </div>

                <div>
                    <label htmlFor="level" className="block text-sm font-medium text-gray-300 mb-1">
                        Difficulty Level*
                    </label>
                    <select
                        id="level"
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-200"
                        disabled={isLoading}
                    >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                        Category*
                    </label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-200 ${errors.category ? "border-red-500" : "border-gray-600"
                            }`}
                        placeholder="e.g. Web Development"
                        disabled={isLoading}
                    />
                    {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                        Description*
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-200 ${errors.description ? "border-red-500" : "border-gray-600"
                            }`}
                        placeholder="Enter course description"
                        disabled={isLoading}
                    ></textarea>
                    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-3">Tags</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {formData.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-700 text-gray-200 rounded-md flex items-center gap-1">
                                <Tag size={12} />
                                {tag}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTag(tag)}
                                    className="ml-1 text-gray-400 hover:text-gray-200"
                                    disabled={isLoading}
                                >
                                    <X size={14} />
                                </button>
                            </span>
                        ))}
                    </div>
                    <div className="flex">
                        <input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            className="flex-grow px-3 py-2 border border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-200"
                            placeholder="Add a tag"
                            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={handleAddTag}
                            className="px-3 py-2 bg-gray-700 text-gray-300 rounded-r-md hover:bg-gray-600 flex items-center disabled:opacity-50"
                            disabled={isLoading}
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Press Enter or click the plus button to add a tag</p>
                </div>
            </div>

            <div className="border-t border-gray-700 pt-6 pb-2">
                <h3 className="text-lg font-medium text-gray-200 mb-4">Instructor Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="instructor.name" className="block text-sm font-medium text-gray-300 mb-1">
                            Instructor Name*
                        </label>
                        <input
                            type="text"
                            id="instructor.name"
                            name="instructor.name"
                            value={formData.instructor.name}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-200 ${errors["instructor.name"] ? "border-red-500" : "border-gray-600"
                                }`}
                            placeholder="Enter instructor name"
                            disabled={isLoading}
                        />
                        {errors["instructor.name"] && <p className="mt-1 text-sm text-red-500">{errors["instructor.name"]}</p>}
                    </div>

                    <div>
                        <label htmlFor="instructor.email" className="block text-sm font-medium text-gray-300 mb-1">
                            Instructor Email*
                        </label>
                        <input
                            type="email"
                            id="instructor.email"
                            name="instructor.email"
                            value={formData.instructor.email}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-200 ${errors["instructor.email"] ? "border-red-500" : "border-gray-600"
                                }`}
                            placeholder="Enter instructor email"
                            disabled={isLoading}
                        />
                        {errors["instructor.email"] && <p className="mt-1 text-sm text-red-500">{errors["instructor.email"]}</p>}
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="instructor.bio" className="block text-sm font-medium text-gray-300 mb-1">
                            Instructor Bio
                        </label>
                        <textarea
                            id="instructor.bio"
                            name="instructor.bio"
                            value={formData.instructor.bio}
                            onChange={handleChange}
                            rows="2"
                            className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-200"
                            placeholder="Enter instructor bio"
                            disabled={isLoading}
                        ></textarea>
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="instructor.avatarUrl" className="block text-sm font-medium text-gray-300 mb-1">
                            Instructor Avatar URL
                        </label>
                        <input
                            type="text"
                            id="instructor.avatarUrl"
                            name="instructor.avatarUrl"
                            value={formData.instructor.avatarUrl}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-200"
                            placeholder="https://example.com/avatar.jpg"
                            disabled={isLoading}
                        />
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Course Thumbnail</label>
                <div className="flex items-start gap-4">
                    <div className="flex-1">
                        <div className="flex items-center justify-center w-full">
                            <label
                                htmlFor="thumbnail"
                                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-8 h-8 mb-2 text-gray-500" />
                                    <p className="mb-2 text-sm text-gray-500">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 2MB)</p>
                                </div>
                                <input
                                    id="thumbnail"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleThumbnailChange}
                                    disabled={isLoading}
                                />
                            </label>
                        </div>
                        {errors.thumbnailUrl && <p className="mt-1 text-sm text-red-500">{errors.thumbnailUrl}</p>}
                    </div>

                    {(thumbnailPreview || formData.thumbnailUrl) && (
                        <div className="w-32 h-32 relative">
                            <img
                                src={thumbnailPreview || formData.thumbnailUrl || "/placeholder.svg"}
                                alt="Thumbnail preview"
                                className="w-full h-full object-cover rounded-md border border-gray-600"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setThumbnailPreview("")
                                    setThumbnailFile(null)
                                    setFormData({
                                        ...formData,
                                        thumbnailUrl: "",
                                    })
                                }}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 disabled:opacity-50"
                                disabled={isLoading}
                            >
                                <X size={14} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex items-center gap-1 px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50"
                    disabled={isLoading}
                >
                    <X size={16} />
                    <span>Cancel</span>
                </button>
                <button
                    type="submit"
                    className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            <span>Processing...</span>
                        </>
                    ) : (
                        <>
                            <Save size={16} />
                            <span>{isEditing ? "Update Course" : "Save Course"}</span>
                        </>
                    )}
                </button>
            </div>
        </form>
    )
}

export default CourseForm
