// Session Storage Manager for Course System

export const SessionStorageKeys = {
    ALL_COURSES: "allCourses",
    SELECTED_COURSE: "selectedCourse",
    COURSE_FAVORITES: "courseFavorites",
    ENROLLED_COURSES: "enrolledCourses",
    COURSE_FILTERS: "courseFilters",
    COURSE_TRANSACTIONS: "courseTransactions",
    LAST_TRANSACTION: "lastTransaction",
    USER_PREFERENCES: "userPreferences",
}

export class SessionStorageManager {
    // Generic methods
    static setItem(key, value) {
        try {
            sessionStorage.setItem(key, JSON.stringify(value))
            return true
        } catch (error) {
            console.error(`Error saving to session storage (${key}):`, error)
            return false
        }
    }

    static getItem(key, defaultValue = null) {
        try {
            const item = sessionStorage.getItem(key)
            return item ? JSON.parse(item) : defaultValue
        } catch (error) {
            console.error(`Error reading from session storage (${key}):`, error)
            return defaultValue
        }
    }

    static removeItem(key) {
        try {
            sessionStorage.removeItem(key)
            return true
        } catch (error) {
            console.error(`Error removing from session storage (${key}):`, error)
            return false
        }
    }

    static clear() {
        try {
            sessionStorage.clear()
            return true
        } catch (error) {
            console.error("Error clearing session storage:", error)
            return false
        }
    }

    // Course-specific methods
    static saveCourses(courses) {
        return this.setItem(SessionStorageKeys.ALL_COURSES, courses)
    }

    static getCourses() {
        return this.getItem(SessionStorageKeys.ALL_COURSES, [])
    }

    static saveSelectedCourse(course) {
        return this.setItem(SessionStorageKeys.SELECTED_COURSE, course)
    }

    static getSelectedCourse() {
        return this.getItem(SessionStorageKeys.SELECTED_COURSE)
    }

    static saveFavorites(favorites) {
        return this.setItem(SessionStorageKeys.COURSE_FAVORITES, Array.from(favorites))
    }

    static getFavorites() {
        const favorites = this.getItem(SessionStorageKeys.COURSE_FAVORITES, [])
        return new Set(favorites)
    }

    static saveEnrolledCourses(enrolled) {
        return this.setItem(SessionStorageKeys.ENROLLED_COURSES, Array.from(enrolled))
    }

    static getEnrolledCourses() {
        const enrolled = this.getItem(SessionStorageKeys.ENROLLED_COURSES, [])
        return new Set(enrolled)
    }

    static saveFilters(filters) {
        return this.setItem(SessionStorageKeys.COURSE_FILTERS, filters)
    }

    static getFilters() {
        return this.getItem(SessionStorageKeys.COURSE_FILTERS, {
            searchTerm: "",
            selectedCategory: "all",
            selectedLevel: "all",
            priceRange: "all",
            sortBy: "popular",
        })
    }

    static saveTransaction(transaction) {
        const transactions = this.getItem(SessionStorageKeys.COURSE_TRANSACTIONS, [])
        transactions.push(transaction)
        this.setItem(SessionStorageKeys.COURSE_TRANSACTIONS, transactions)
        this.setItem(SessionStorageKeys.LAST_TRANSACTION, transaction)
        return true
    }

    static getTransactions() {
        return this.getItem(SessionStorageKeys.COURSE_TRANSACTIONS, [])
    }

    static getLastTransaction() {
        return this.getItem(SessionStorageKeys.LAST_TRANSACTION)
    }

    static addToFavorites(courseId) {
        const favorites = this.getFavorites()
        favorites.add(courseId)
        return this.saveFavorites(favorites)
    }

    static removeFromFavorites(courseId) {
        const favorites = this.getFavorites()
        favorites.delete(courseId)
        return this.saveFavorites(favorites)
    }

    static enrollInCourse(courseId) {
        const enrolled = this.getEnrolledCourses()
        enrolled.add(courseId)
        return this.saveEnrolledCourses(enrolled)
    }

    static isEnrolled(courseId) {
        const enrolled = this.getEnrolledCourses()
        return enrolled.has(courseId)
    }

    static isFavorite(courseId) {
        const favorites = this.getFavorites()
        return favorites.has(courseId)
    }

    // Utility methods
    static getCourseById(courseId) {
        const courses = this.getCourses()
        return courses.find((course) => course._id === courseId)
    }

    static updateCourseInStorage(updatedCourse) {
        const courses = this.getCourses()
        const index = courses.findIndex((course) => course._id === updatedCourse._id)
        if (index !== -1) {
            courses[index] = updatedCourse
            this.saveCourses(courses)

            // Update selected course if it's the same
            const selectedCourse = this.getSelectedCourse()
            if (selectedCourse && selectedCourse._id === updatedCourse._id) {
                this.saveSelectedCourse(updatedCourse)
            }
            return true
        }
        return false
    }

    static getEnrollmentStats() {
        const enrolled = this.getEnrolledCourses()
        const favorites = this.getFavorites()
        const transactions = this.getTransactions()

        return {
            totalEnrolled: enrolled.size,
            totalFavorites: favorites.size,
            totalTransactions: transactions.length,
            totalSpent: transactions.reduce((sum, t) => sum + (t.amount || 0), 0),
        }
    }

    // Clean up old data
    static cleanupOldData(daysToKeep = 7) {
        const cutoffDate = new Date()
        cutoffDate.setDate(cutoffDate.getDate() - daysToKeep)

        const transactions = this.getTransactions()
        const filteredTransactions = transactions.filter((t) => new Date(t.date) > cutoffDate)

        if (filteredTransactions.length !== transactions.length) {
            this.setItem(SessionStorageKeys.COURSE_TRANSACTIONS, filteredTransactions)
            return transactions.length - filteredTransactions.length
        }

        return 0
    }
}

export default SessionStorageManager
