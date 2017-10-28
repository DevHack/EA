/* global app */
app.factory('FormDataFactory', [function FormDataFactory() {
  const data = {};
  let userAge;
  let availableDegrees = [];
  let availableCourses = [];

  // TESTING - Remove in prod
  // data.firstName = 'Allan';
  // data.lastName = 'Wintersieck';
  // data.birthdate = new Date('04/01/1987');
  // data.emailAddress = 'allan@devetry.com';
  // data.firstName = 'Allan';
  // data.lastName = 'Wintersieck';
  // data.birthdate = new Date('04/01/1997');
  // data.emailAddress = 'allan9@devetry.com';

  return {
    getData() {
      return data;
    },
    setBasicInformation(basicInformation) {
      data.firstName = basicInformation.firstName;
      data.lastName = basicInformation.lastName;
      data.birthdate = basicInformation.birthdate;
      data.emailAddress = basicInformation.emailAddress;
    },
    setId(id) {
      data.recId = id;
    },
    setUserAge(age) {
      userAge = Number(age);
    },
    getUserAge() {
      return userAge;
    },
    setDegree(degreeId) {
      data.selectedDegreeIds = [degreeId];
    },
    setCourses(courseData) {
      data.selectedCourseIds = courseData.selectedCourseIds;
      data.alreadyTakenCoursesOnList = courseData.alreadyTakenCoursesOnList;
      data.addMoreCourses = courseData.addMoreCourses;
    },
    setCompleteApplication(completeApplicationData) {
      // data.intendedDegreeSeekingTime = completeApplicationData.intendedDegreeSeekingTime;
      data.highSchoolAttended = completeApplicationData.highSchoolAttended;
      data.whichDescribesYourHSEducation = completeApplicationData.whichDescribesYourHSEducation;
      data.highSchoolState = completeApplicationData.highSchoolState;
      data.collegeAttended = completeApplicationData.collegeAttended;
    },
    setCompleted(completed) {
      data.completed = completed;
    },
    setNeedsEnrollmentSupport(needsEnrollmentSupport) {
      data.needsEnrollmentSupport = needsEnrollmentSupport;
    },
    setAvailableDegrees(degrees) {
      availableDegrees = degrees;
    },
    getAvailableDegrees() {
      return availableDegrees;
    },
    setAvailableCourses(courses) {
      availableCourses = courses;
    },
    getAvailableCourses() {
      // Take out inactive courses
      const prunedAvailableCourses = [];
      for (let i = 0, length = availableCourses.length; i < length; i++) {
        if (availableCourses[i].courseIsActive) {
          prunedAvailableCourses.push(availableCourses[i]);
        } else {
          // console.warn('discarded course', availableCourses[i]);
        }
      }
      return prunedAvailableCourses;
    },
  };
}]);
