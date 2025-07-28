/**
 * Course Management API Client
 *
 * A utility class for interacting with the course management API
 */
class CourseApiClient {
    constructor(baseUrl = "http://localhost:9000") {
        this.baseUrl = baseUrl
    }

    /**
     * Get all courses (using the existing endpoint for backward compatibility)
     * @returns {Promise<Array>} Array of courses
     */
    async getAllCourses() {
        try {
            const response = await fetch(`${this.baseUrl}/courses/get-all-course`)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            return data
        } catch (error) {
            console.error("Error fetching courses:", error)
            throw new Error(`Failed to fetch courses: ${error.message}`)
        }
    }

    /**
     * Get a single course by ID
     * @param {string} courseId - The ID of the course
     * @returns {Promise<Object>} Course object
     */
    async getCourse(courseId) {
        try {
            const response = await fetch(`${this.baseUrl}/courses/courses/${courseId}`)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            if (!data.success) {
                throw new Error(data.message || "Failed to fetch course")
            }

            return data.data
        } catch (error) {
            console.error(`Error fetching course ${courseId}:`, error)
            throw new Error(`Failed to fetch course: ${error.message}`)
        }
    }

    /**
     * Create a new course
     * @param {Object} courseData - The course data
     * @returns {Promise<Object>} Created course object
     */
    async createCourse(courseData) {
        try {
            const response = await fetch(`${this.baseUrl}/courses/courses`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(courseData),
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            if (!data.success) {
                throw new Error(data.message || "Failed to create course")
            }

            return data.data
        } catch (error) {
            console.error("Error creating course:", error)
            throw new Error(`Failed to create course: ${error.message}`)
        }
    }

    /**
     * Update an existing course
     * @param {string} courseId - The ID of the course to update
     * @param {Object} updates - The course updates
     * @returns {Promise<Object>} Updated course object
     */
    async updateCourse(courseId, updates) {
        try {
            const response = await fetch(`${this.baseUrl}/courses/courses/${courseId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updates),
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            if (!data.success) {
                throw new Error(data.message || "Failed to update course")
            }

            return data.data
        } catch (error) {
            console.error(`Error updating course ${courseId}:`, error)
            throw new Error(`Failed to update course: ${error.message}`)
        }
    }

    /**
     * Delete a course
     * @param {string} courseId - The ID of the course to delete
     * @returns {Promise<Object>} Deleted course object
     */
    async deleteCourse(courseId) {
        try {
            const response = await fetch(`${this.baseUrl}/courses/courses/${courseId}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            if (!data.success) {
                throw new Error(data.message || "Failed to delete course")
            }

            return data.data
        } catch (error) {
            console.error(`Error deleting course ${courseId}:`, error)
            throw new Error(`Failed to delete course: ${error.message}`)
        }
    }

    /**
     * Add content to a course
     * @param {string} courseId - The ID of the course
     * @param {Object} contentData - The content data
     * @returns {Promise<Object>} Updated course and added content
     */
    async addContent(courseId, contentData) {
        try {
            const response = await fetch(`${this.baseUrl}/courses/courses/${courseId}/contents`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contentData),
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            if (!data.success) {
                throw new Error(data.message || "Failed to add content")
            }

            return data.data
        } catch (error) {
            console.error(`Error adding content to course ${courseId}:`, error)
            throw new Error(`Failed to add content: ${error.message}`)
        }
    }

    /**
     * Update content in a course
     * @param {string} courseId - The ID of the course
     * @param {number} contentId - The ID of the content
     * @param {Object} updates - The content updates
     * @returns {Promise<Object>} Updated course and content
     */
    async updateContent(courseId, contentId, updates) {
        try {
            const response = await fetch(`${this.baseUrl}/courses/courses/${courseId}/contents/${contentId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updates),
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            if (!data.success) {
                throw new Error(data.message || "Failed to update content")
            }

            return data.data
        } catch (error) {
            console.error(`Error updating content ${contentId} in course ${courseId}:`, error)
            throw new Error(`Failed to update content: ${error.message}`)
        }
    }

    /**
     * Delete content from a course
     * @param {string} courseId - The ID of the course
     * @param {number} contentId - The ID of the content
     * @returns {Promise<Object>} Updated course and deleted content
     */
    async deleteContent(courseId, contentId) {
        try {
            const response = await fetch(`${this.baseUrl}/courses/courses/${courseId}/contents/${contentId}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            if (!data.success) {
                throw new Error(data.message || "Failed to delete content")
            }

            return data.data
        } catch (error) {
            console.error(`Error deleting content ${contentId} from course ${courseId}:`, error)
            throw new Error(`Failed to delete content: ${error.message}`)
        }
    }

    /**
     * Bulk add content to a course
     * @param {string} courseId - The ID of the course
     * @param {Array} contentsData - Array of content objects
     * @returns {Promise<Object>} Updated course and added contents
     */
    async bulkAddContent(courseId, contentsData) {
        try {
            const response = await fetch(`${this.baseUrl}/courses/courses/${courseId}/contents/bulk`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ contents: contentsData }),
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            if (!data.success) {
                throw new Error(data.message || "Failed to add contents")
            }

            return data.data
        } catch (error) {
            console.error(`Error bulk adding contents to course ${courseId}:`, error)
            throw new Error(`Failed to add contents: ${error.message}`)
        }
    }

    /**
     * Reorder contents in a course
     * @param {string} courseId - The ID of the course
     * @param {Array} contentIds - Array of content IDs in the desired order
     * @returns {Promise<Object>} Updated course
     */
    async reorderContents(courseId, contentIds) {
        try {
            const response = await fetch(`${this.baseUrl}/courses/courses/${courseId}/contents/reorder`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ contentIds }),
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            if (!data.success) {
                throw new Error(data.message || "Failed to reorder contents")
            }

            return data.data
        } catch (error) {
            console.error(`Error reordering contents in course ${courseId}:`, error)
            throw new Error(`Failed to reorder contents: ${error.message}`)
        }
    }

    /**
     * Enroll a student in a course
     * @param {Object} enrollmentData - The enrollment data
     * @returns {Promise<Object>} Enrollment result
     */
    async enrollInCourse(enrollmentData) {
        try {
            const response = await fetch(`${this.baseUrl}/courses/enroll`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(enrollmentData),
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            if (!data.success) {
                throw new Error(data.message || "Failed to enroll in course")
            }

            return data.data
        } catch (error) {
            console.error("Error enrolling in course:", error)
            throw new Error(`Failed to enroll in course: ${error.message}`)
        }
    }
}

export default CourseApiClient
