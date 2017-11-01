/* global app */
export default class FormDataModel {

    constructor() {
        this._data = {};
        this._userAge = 0;
        this._availableDegrees = [];
        this._availableCourses = [];
    }

    // TESTING - Remove in prod
    // this._data.firstName = 'Allan';
    // this._data.lastName = 'Wintersieck';
    // this._data.birthdate = new Date('04/01/1987');
    // this._data.emailAddress = 'allan@devetry.com';
    // this._data.firstName = 'Allan';
    // this._data.lastName = 'Wintersieck';
    // this._data.birthdate = new Date('04/01/1997');
    // this._data.emailAddress = 'allan9@devetry.com';


    getData() {
        return this._data;
    }

    setBasicInformation(basicInformation) {
        this._data.firstName = basicInformation.firstName;
        this._data.lastName = basicInformation.lastName;
        this._data.birthdate = basicInformation.birthdate;
        this._data.emailAddress = basicInformation.emailAddress;
    }

    setId(id) {
        this._data.recId = id;
    }

    setUserAge(age) {
        this._userAge = Number(age);
    }

    getUserAge() {
        return this._userAge;
    }

    setDegree(degreeId) {
        this._data.selectedDegreeIds = [degreeId];
    }

    setCourses(courseData) {
        this._data.selectedCourseIds = courseData.selectedCourseIds;
        this._data.alreadyTakenCoursesOnList = courseData.alreadyTakenCoursesOnList;
        this._data.addMoreCourses = courseData.addMoreCourses;
    }

    setCompleteApplication(completeApplicationData) {
        // this._data.intendedDegreeSeekingTime = completeApplicationData.intendedDegreeSeekingTime;
        this._data.highSchoolAttended = completeApplicationData.highSchoolAttended;
        this._data.whichDescribesYourHSEducation = completeApplicationData.whichDescribesYourHSEducation;
        this._data.highSchoolState = completeApplicationData.highSchoolState;
        this._data.collegeAttended = completeApplicationData.collegeAttended;
    }

    setCompleted(completed) {
        this._data.completed = completed;
    }

    setNeedsEnrollmentSupport(needsEnrollmentSupport) {
        this._data.needsEnrollmentSupport = needsEnrollmentSupport;
    }

    setAvailableDegrees(degrees) {
        this._availableDegrees = degrees;
    }

    getAvailableDegrees() {
        return this._availableDegrees;
    }

    setAvailableCourses(courses) {
        this._availableCourses = courses;
    }

    getAvailableCourses() {
        // Take out inactive courses
        const prunedAvailableCourses = [];
        for (let i = 0, length = this._availableCourses.length; i < length; i++) {
            if (this._availableCourses[i].courseIsActive) {
                prunedAvailableCourses.push(this._availableCourses[i]);
            } else {
                // console.warn('discarded course', this._availableCourses[i]);
            }
        }
        return prunedAvailableCourses;
    }
}
