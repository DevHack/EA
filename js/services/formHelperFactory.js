/* global app, Image */
export default function FormHelperFactory() {
    const preloadedImages = [];
    return {
        preloadDegreeImages(degrees) {
            for (let i = 0, length = degrees.length; i < length; i++) {
                if (degrees[i].degreeImageLocationUrlActive) {
                    const image = new Image();
                    image.src = degrees[i].degreeImageLocationUrlActive;
                    preloadedImages.push(image);
                }
            }
        },
        under22AndMissingRecommendedCourses(form, userAge, availableCourses) {
            if (userAge < 22 && form.alreadyTakenCoursesOnList === 'Yes') {
                let missingRecommendedCourses = 0;
                for (let i = 0, length = availableCourses.length; i < length; i++) {
                    // Check if the user has NOT selected this available course, and it's a recommended course
                    if (availableCourses[i].recommended &&
                        form.selectedCourseIds.indexOf(availableCourses[i].courseId) === -1) {
                        missingRecommendedCourses += 1;
                    }
                }
                if (missingRecommendedCourses >= 2) {
                    return true;
                }
            }
            return false;
        },
    };
}
