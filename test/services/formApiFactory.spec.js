/* global angular, inject */
/*describe('API factory', () => {
  const baseUrl = 'https://tlbzufb3z4.execute-api.us-east-1.amazonaws.com/PROD/gfa/';
  let FormApiFactory;
  let httpLocalBackend;

  beforeEach(angular.mock.module('gfaForm'));
  beforeEach(inject((_FormApiFactory_) => {
    FormApiFactory = _FormApiFactory_;
  }));
  beforeEach(inject(($httpBackend) => {
    httpLocalBackend = $httpBackend;
  }));

  it('can create learner application', (done) => {
    httpLocalBackend.expectPOST(`${baseUrl}ea-learner-applications`).respond(200, { test: true });
    FormApiFactory.createLearnerApplication().then((response) => {
      expect(response.test).toBe(true);
      done();
    });
    httpLocalBackend.flush();
  });

  it('can transform booleans on returned data', () => {
    const testData = [{ sortOrder: 1, sfdcToken: null, sfdcHostname: null, required: 'false', name: 'GFAPAD-1', id: 'a0e41000002oYiBAAU', degreeTooltip: 'Whether you’re interested in starting your own business, establishing yourself in your chosen career, or traveling the globe, pursuing a degree in business is useful just about anywhere.', degreeShortDescription: 'Whether you’re interested in starting your own business, establishing yourself in your chosen career, or traveling the globe, pursuing a degree in business is useful just about anywhere.', degreeName: 'Business', degreeLongDescription: 'This is a long description about a Business Degree. This can be displayed on a Degree details page for example...', degreeIsActive: 'true', degreeImageLocationUrlPassive: 'https://s3.amazonaws.com/gfa-ea-assets/images/business.svg', degreeImageLocationUrlActive: 'https://s3.amazonaws.com/gfa-ea-assets/images/business_active.svg', degreeId: 'a0d41000003vez4AAA', applicationId: 'a0b41000005Lk1vAAC', applicationDegreeId: 'a0e41000002oYiBAAU' }];

    // Values should be strings before transform
    expect(testData[0].required).toBe('false');
    expect(testData[0].degreeIsActive).toBe('true');

    FormApiFactory.transformBooleans(testData);

    // Values should now be booleans
    expect(testData[0].required).toBe(false);
    expect(testData[0].degreeIsActive).toBe(true);
  });
});*/
import FormAPIFactory from "../../js/modules/enrollment_selection/services/formApiFactory";
describe("test", ()=>{
  it("asdf",()=>{
    console.log(new FormAPIFactory(1,2,3))
    expect((new FormAPIFactory(1,2,3)).getSum(2,4)).toBe(6);
  });

});
