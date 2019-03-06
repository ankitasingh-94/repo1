const login = require('../new_tests/login');
const accountSetup = require('../new_tests/accountSetup');
const member = require('../new_tests/member');
const testConstants = require('../../feeder');

module.exports = {

  'Login as a CCR and Add a WB Org': function (client) {
    const setup = client.page.AccountSetupPage();
    const org = client.page.UniversalElements();

    login.renderLoginPage(client)
    login.ccrLogin(client)
    accountSetup.addBillingOrg(client)
   //org.searchForOrganization(testConstants.orgName, '@organizationSearchResult')
    setup.getOrgId()
  },

//  'Create a Member for this new Org': function (client) {
//     member["Add a new Member"](client)
//   },

//   'Add a New Phone Type Channel for this Org': function (client) {
//     const channel = client.page.NewChannelSetup();

//     channel.navigate()
//     .clickAddChannel()
//     .newPhoneNumberChannelCreation()
//   },

//   'Creating Patient Type Group for this new Org': function (client) {
//     const group = client.page.GroupsPage();

//     group.navigate()
//       .verifyGroupEls()
//       .createGroup()
//   },

//   'Creating Office for this new org': function (client) {
//     const office = client.page.Office();

//     office.navigate()
//       .clickAddOffice()
//       .createOfficeForm()
//       .clickCreateOffice()
//   },

//   'Creating OOO Event for this new Org': function (client) {
//     const ooo = client.page.OutOfOfficePage();

//     ooo.navigate()
//       .validateUrlChange()
//       .pause(3000)
//       .verifyCreateOOOEventButton()
//       .openOOOPage('@addOOOEventButton', '@createEventPageHeader')
//       .updateDetails('@titleInput', testConstants.oooTitle)
//       .updateDetails('@messageTextArea', testConstants.oooMessage)
//       .updateDetails('@fromDateInput', testConstants.oooFromDate)
//       .updateDetails('@toDateInput', testConstants.oooToDate)
//       .updateDetails('@fromTimeInput', testConstants.oooFromTime)
//       .updateDetails('@toTimeInput', testConstants.oooToTime)
//       .selectChannel()
//       .submit('@createEventButton', '@eventCreateSuccessMessage')
//   },

  // 'Creating a Tags for this new Org': function (client) {
  //   const tags = client.page.TagsPage();

  //   tags.navigate()
  //     .validateCreateTagModal()
  //     .createNewTag();

  //     client.end(100000);
  // },
}