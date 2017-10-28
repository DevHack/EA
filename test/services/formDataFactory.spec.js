/* global angular, inject */
describe('Data factory', () => {
  let FormDataFactory;

  beforeEach(angular.mock.module('gfaForm'));
  beforeEach(inject((_FormDataFactory_) => {
    FormDataFactory = _FormDataFactory_;
  }));

  it('should start with no data', () => {
    expect(FormDataFactory.getData()).toEqual({});
  });

  it('should be able to set basic information', () => {
    FormDataFactory.setBasicInformation({
      firstName: 'John',
      lastName: 'Doe',
      birthdate: new Date('1/1/2000'),
      emailAddress: 'johndoe@devetry.com',
    });
    expect(FormDataFactory.getData().firstName).toBe('John');
    expect(FormDataFactory.getData().lastName).toBe('Doe');
    expect(FormDataFactory.getData().birthdate).toEqual(new Date('1/1/2000'));
    expect(FormDataFactory.getData().emailAddress).toBe('johndoe@devetry.com');
  });
  it('should be able to set ID', () => {
    FormDataFactory.setId('test_id');
    expect(FormDataFactory.getData().recId).toBe('test_id');
  });
  it('should be able to get user age', () => {
    FormDataFactory.setUserAge(25);
    expect(FormDataFactory.getUserAge()).toBe(25);
  });
  it('should be able to set degree ids', () => {
    FormDataFactory.setDegree(123);
    expect(FormDataFactory.getData().selectedDegreeIds).toContain(123);
  });
  it('should be able to set course data', () => {
    FormDataFactory.setCourses({
      selectedCourseIds: [123, 456],
      alreadyTakenCoursesOnList: ['math', 'english'],
      addMoreCourses: true,
    });
    expect(FormDataFactory.getData().selectedCourseIds).toEqual([123, 456]);
    expect(FormDataFactory.getData().alreadyTakenCoursesOnList).toEqual(['math', 'english']);
    expect(FormDataFactory.getData().addMoreCourses).toBe(true);
  });
  it('should be able to set complete application', () => {
    FormDataFactory.setCompleteApplication({
      highSchoolAttended: 'East High',
      whichDescribesYourHSEducation: 'Graduated high school',
      highSchoolState: 'AZ',
      collegeAttended: 'Arizona State Univ',
    });
    expect(FormDataFactory.getData().highSchoolAttended).toBe('East High');
    expect(FormDataFactory.getData().whichDescribesYourHSEducation).toBe('Graduated high school');
    expect(FormDataFactory.getData().highSchoolState).toBe('AZ');
    expect(FormDataFactory.getData().collegeAttended).toBe('Arizona State Univ');
  });
  it('should be able to set completed', () => {
    FormDataFactory.setCompleted(true);
    expect(FormDataFactory.getData().completed).toBe(true);
  });
  it('should be able to set needs enrollment support', () => {
    FormDataFactory.setNeedsEnrollmentSupport(true);
    expect(FormDataFactory.getData().needsEnrollmentSupport).toBe(true);
  });
  it('should be able to get available degrees', () => {
    FormDataFactory.setAvailableDegrees({
      id: '123',
      name: 'Business',
    });
    expect(FormDataFactory.getAvailableDegrees()).toEqual({ id: '123', name: 'Business' });
  });
  it('should be able to get available courses', () => {
    FormDataFactory.setAvailableCourses([{
      id: '123',
      name: 'Business 101',
      courseIsActive: true,
    },
    {
      id: '456',
      name: 'Math 101',
      courseIsActive: false,
    }]);
    const result = FormDataFactory.getAvailableCourses();
    expect(result[0]).toEqual({ id: '123', name: 'Business 101', courseIsActive: true });
    expect(result.length).toBe(1);
  });
});
