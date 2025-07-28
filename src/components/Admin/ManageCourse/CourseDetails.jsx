"use client"

import {
    ArrowLeft,
    Clock,
    DollarSign,
    Users,
    Star,
    Tag,
    Play,
    Trash2,
    Calendar,
    User,
    Mail,
    PlusCircle,
    Edit,
} from "lucide-react"

const CourseDetails = ({ course, onBack, onEdit, onAddContent, onDeleteContent, openYoutubeVideo }) => {
    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return "N/A"
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    return (
        <div className="max-w-6xl mx-auto p-4 bg-gray-900 rounded-lg shadow-lg text-gray-200">
            <button onClick={onBack} className="flex items-center gap-1 text-gray-400 hover:text-gray-200 mb-4">
                <ArrowLeft size={16} />
                <span>Back to Courses</span>
            </button>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Course thumbnail */}
                <div className="md:w-1/3">
                    {course.thumbnailUrl ? (
                        <img
                            src={course.thumbnailUrl || "/placeholder.svg"}
                            alt={course.title}
                            className="w-full aspect-video object-cover rounded-lg shadow-md"
                        />
                    ) : (
                        <div className="w-full aspect-video bg-gray-800 rounded-lg shadow-md flex items-center justify-center">
                            <span className="text-gray-500">No thumbnail</span>
                        </div>
                    )}

                    <div className="mt-4 space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-800 rounded-md">
                            <div className="flex items-center gap-2">
                                <DollarSign size={18} className="text-green-500" />
                                <span className="font-medium">Price</span>
                            </div>
                            <span className="text-xl font-bold">${course.price || 0}</span>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-gray-800 rounded-md">
                            <div className="flex items-center gap-2">
                                <Clock size={18} className="text-blue-500" />
                                <span className="font-medium">Duration</span>
                            </div>
                            <span>{course.duration || "N/A"}</span>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-gray-800 rounded-md">
                            <div className="flex items-center gap-2">
                                <Users size={18} className="text-purple-500" />
                                <span className="font-medium">Enrolled</span>
                            </div>
                            <span>{course.enrollmentCount || 0} students</span>
                        </div>

                        {course.rating > 0 && (
                            <div className="flex justify-between items-center p-3 bg-gray-800 rounded-md">
                                <div className="flex items-center gap-2">
                                    <Star size={18} className="text-yellow-500" />
                                    <span className="font-medium">Rating</span>
                                </div>
                                <span>
                                    {course.rating.toFixed(1)} ({course.reviewCount || 0} reviews)
                                </span>
                            </div>
                        )}

                        <div className="flex justify-between items-center p-3 bg-gray-800 rounded-md">
                            <div className="flex items-center gap-2">
                                <Calendar size={18} className="text-red-500" />
                                <span className="font-medium">Created</span>
                            </div>
                            <span>{formatDate(course.createdAt)}</span>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-gray-800 rounded-md">
                            <div className="flex items-center gap-2">
                                <Calendar size={18} className="text-orange-500" />
                                <span className="font-medium">Updated</span>
                            </div>
                            <span>{formatDate(course.updatedAt)}</span>
                        </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                        <button
                            onClick={onEdit}
                            className="flex-1 flex items-center justify-center gap-1 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors"
                        >
                            <Edit size={16} />
                            <span>Edit Course</span>
                        </button>
                        <button
                            onClick={onAddContent}
                            className="flex-1 flex items-center justify-center gap-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                        >
                            <PlusCircle size={16} />
                            <span>Add Content</span>
                        </button>
                    </div>
                </div>

                {/* Course details */}
                <div className="md:w-2/3">
                    <h1 className="text-3xl font-bold text-gray-100 mb-2">{course.title}</h1>

                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 text-sm font-medium rounded-md bg-blue-900 text-blue-200">
                            {course.level || "Beginner"}
                        </span>
                        {course.category && (
                            <span className="px-2 py-1 text-sm font-medium rounded-md bg-purple-900 text-purple-200">
                                {course.category}
                            </span>
                        )}
                        {course.status && (
                            <span
                                className={`px-2 py-1 text-sm font-medium rounded-md ${course.status === "published" ? "bg-green-900 text-green-200" : "bg-gray-700 text-gray-300"
                                    }`}
                            >
                                {course.status}
                            </span>
                        )}
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-200 mb-2">Description</h2>
                        <p className="text-gray-300 whitespace-pre-line">{course.description}</p>
                    </div>

                    {course.tags && course.tags.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-200 mb-2">Tags</h2>
                            <div className="flex flex-wrap gap-2">
                                {course.tags.map((tag, index) => (
                                    <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 rounded-md flex items-center gap-1">
                                        <Tag size={12} />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {course.instructor && (
                        <div className="mb-6 p-4 bg-gray-800 rounded-lg">
                            <h2 className="text-xl font-semibold text-gray-200 mb-3">Instructor</h2>
                            <div className="flex items-start gap-4">
                                {course.instructor.avatarUrl ? (
                                    <img
                                        src={course.instructor.avatarUrl || "/placeholder.svg"}
                                        alt={course.instructor.name}
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
                                        <User size={24} className="text-gray-500" />
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-lg font-medium text-gray-100">{course.instructor.name}</h3>
                                    <div className="flex items-center gap-1 text-gray-400 text-sm mt-1">
                                        <Mail size={14} />
                                        <span>{course.instructor.email}</span>
                                    </div>
                                    {course.instructor.bio && <p className="mt-2 text-gray-300">{course.instructor.bio}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-200">Course Content</h2>
                            <span className="text-sm text-gray-400">{course.contents?.length || 0} items</span>
                        </div>

                        {!course.contents || course.contents.length === 0 ? (
                            <div className="p-6 bg-gray-800 rounded-lg text-center">
                                <p className="text-gray-400 mb-4">No content available for this course yet.</p>
                                <button
                                    onClick={onAddContent}
                                    className="inline-flex items-center gap-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                                >
                                    <PlusCircle size={16} />
                                    <span>Add Your First Content</span>
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {course.contents.map((content) => (
                                    <div key={content.id} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="text-lg font-medium text-gray-200">{content.title}</h3>
                                                    {content.isPreview && (
                                                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-900 text-green-200">
                                                            Preview
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex gap-4 text-sm text-gray-400 mt-1">
                                                    <span className="flex items-center gap-1">
                                                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                                        {content.type}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock size={14} />
                                                        {content.duration}
                                                    </span>
                                                </div>
                                                {content.description && <p className="mt-2 text-gray-300">{content.description}</p>}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {content.type === "video" && content.videoUrl && (
                                                    <button
                                                        onClick={() => openYoutubeVideo(content.videoUrl)}
                                                        className="p-2 text-blue-400 hover:text-blue-300 hover:bg-gray-700 rounded-md transition-colors"
                                                    >
                                                        <Play size={18} />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => onDeleteContent(course._id, content.id)}
                                                    className="p-2 text-red-500 hover:text-red-400 hover:bg-gray-700 rounded-md transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>

                                        {content.type === "video" && content.videoThumbnail && (
                                            <div className="mt-3 relative">
                                                <img
                                                    src={content.videoThumbnail || "/placeholder.svg"}
                                                    alt={content.title}
                                                    className="w-full h-48 object-cover rounded-md cursor-pointer"
                                                    onClick={() => openYoutubeVideo(content.videoUrl)}
                                                />
                                                <div
                                                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-20 transition-opacity rounded-md cursor-pointer"
                                                    onClick={() => openYoutubeVideo(content.videoUrl)}
                                                >
                                                    <div className="w-16 h-16 flex items-center justify-center bg-red-600 rounded-full">
                                                        <Play size={32} className="text-white ml-1" />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {content.type === "article" && content.content && (
                                            <div className="mt-3 p-3 bg-gray-700 rounded-md">
                                                <p className="text-gray-300 line-clamp-3">{content.content}</p>
                                            </div>
                                        )}

                                        {content.type === "quiz" && (
                                            <div className="mt-3 p-3 bg-gray-700 rounded-md">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-300">Questions: {content.questions}</span>
                                                    <span className="text-gray-300">Passing Score: {content.passingScore}%</span>
                                                </div>
                                            </div>
                                        )}

                                        {(content.type === "exercise" || content.type === "project") && (
                                            <div className="mt-3">
                                                {content.instructions && (
                                                    <div className="p-3 bg-gray-700 rounded-md mb-2">
                                                        <p className="text-gray-300 line-clamp-2">{content.instructions}</p>
                                                    </div>
                                                )}
                                                {content.resources && content.resources.length > 0 && (
                                                    <div className="flex flex-wrap gap-2">
                                                        {content.resources.map((resource, idx) => (
                                                            <span key={idx} className="px-2 py-1 bg-gray-700 text-gray-300 rounded-md text-sm">
                                                                {resource}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetails
