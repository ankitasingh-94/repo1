const { colors, noteText } = require('../constants');

let text = '';

const billingCommands = {

  pause: function (time) {
    this.api.pause(time);
    return this;
  },

  elementText: function (ele, message) {
    return this.getText(ele, function (tpObj) {
      text = tpObj.value;
      console.log(text, message);
    });
  },

  validateUrlChange: function () {
    return this.waitForElementNotPresent('@billingPage', 6000, false, null, 'Billing page opened successfully')
      .verify.urlContains('billing')  // maybe some timeout issues happening here working as of 9/20/1
      .pause(5000)
  },

  validateSections: function () {
    return this.waitForElementVisible('@billingPage', 'Billing Page is available')
      .verify.visible('@planDetailsSection', 'Billing Detail Section is visible')
      .verify.visible('@contactDetailSection', 'Contact Detail Section is visible')
      .verify.visible('@paymentMethodSection', 'Payment Method Section is visible')
      .verify.visible('@historySection', 'History Section is visible')
  },

  validateCurrentPlan: function () {
    return this.waitForElementVisible('@planDetailsSection', 'Billing Detail Section is available')
      .elementText('@planName', ' is the Subscribed Plan')
      .verify.visible('@textMessageProduct', 'Text Message Product is visible')
      .elementText('@includedMessages', ' : Messages included in plan')
      .verify.visible('@membersProduct', 'Members Product is visible')
      .elementText('@includedMembers', ' : Members included in plan')
      .verify.visible('@textChannelProduct', 'Text Channel Product is visible')
      .elementText('@includedTextChannels', ' : Text Channels included in plan')
  },

  validateIntegrationsProduct: function () {
    let self = this;
    this.getText('@planName', function (tpObj) {
      text = tpObj.value;
      if (text && text.match(/Standard/gi) && text.match(/Standard/gi).length) {
        return self.expect.element('@integrationsProduct').to.be.present;
      } else {
        return self.expect.element('@integrationsProduct').to.not.be.present;
      }
    });
  },

  validateCurrentUsage: function () {
    return this.waitForElementVisible('@currentUsageSection', 'Current Usage Section is available')
      .verify.visible('@textMessageUsage', 'Text Message Usage component is visible')
      .elementText('@usedTextMessage', ' : Text Messages used')
      .verify.visible('@membersUsage', 'Members Usage component is visible')
      .elementText('@usedMembers', ' : Active Members used')
      .verify.visible('@textChannelUsage', 'Text Channel Usage component is visible')
      .elementText('@usedTextChannels', ' : Text Channels used')
  },

  validateColors: function (element, property) {
    this.verify.visible(element, 'Element is visible');

    return this.getCssProperty(element, property, function (res) {

      const currentColor = colors.filter(val => val.code == res.value);
      if (Array.isArray(currentColor) && currentColor.length > 0) {
        console.log(res.value + ' : ' + currentColor[0].color + ' in Color!');
      }
    });
  },


  //to Verify the Add-On and Overages Section
  validateAddOnsOveragesSection: function () {
    return this.waitForElementVisible('@addOnOveragesSection', 'AddOns and Overages Section is visible')
      .verify.visible('@description', 'Description Column Title is visible')
      .verify.visible('@qty', 'Product Quantity Column Title is visible')
      .verify.visible('@unitPrice', 'UnitPrice Column Title is visible')
      .verify.visible('@total', 'Total Column Title is visible')
      .verify.visible('@additionalMember', 'AddtionalMember Row is visible')
      .verify.visible('@additionalMemberQty', 'Quantity for additional members is visible')
      .verify.visible('@additionalMemberUnitPrice', 'Unit Price for additional members is visible')
      .verify.visible('@additionalMemberTotal', 'Total Amount for additional members is visible')
      .verify.visible('@additionalTextChannel', 'AddtionalTextChannel Row is visible')
      .verify.visible('@additionalTextChannelQty', 'Quantity for additional Text Channels is visible')
      .verify.visible('@additionalTextChannelUnitPrice', 'Unit Price for additional Text Channels is visible')
      .verify.visible('@additionalTextChannelTotal', 'Total Price for additional Text Channels is visible')
      .verify.visible('@additionalTextMessages', 'Additional Text Messages row is visible')
      .verify.visible('@additionalTextMessagesQty', 'Quantity for Additional Text messages is visible')
      .verify.visible('@additionalTextMessagesUnitPrice', 'Unit Price for Additional Text messages is visible')
      .verify.visible('@additionalTextMessagesTotal', 'Total for Additional Text messages is visible')
      .verify.visible('@overageMessage', 'Overage Message is visible')
  },

  validateEstimatedBillSection: function () {
    return this.verify.visible('@estimatedBillSection', 'Estimated Bill Section header is visible')
      .verify.visible('@nextBillDate', 'Next Bill Date is visible')
      .verify.visible('@planNameEstimatedBill', 'Plan Name in Estimated bill is visible')
      .verify.visible('@planEstimatedCost', 'Estimated Cost of Plan is visible')
      .verify.visible('@addOnOveragesEstimatedBill', 'Add-On & Overages Name is  visible')
      .verify.visible('@addOnOveragesEstimatedCost', 'Estimated Cost of Add-On & Overage is visible')
      .verify.visible('@planNameEstimatedBill', 'this is test message')
  },

  validateEstimatedBillNote: function () {
    return this.verify.visible('@noteEstimatedBill', 'Note for Estimated Bill is visible')
      .expect.element('@noteEstimatedBill').text.to.equal(noteText)
  },

  // verifyContactSection: function () {
  //   return this.verify.visible(`@contactDetailSection`, 'Contact Detail section is visible')
  // }, Not required as a separate function

  printContactInformation: function () {
    return this.elementText(`@contactInfo`, 'Test');
  },

  verifyContactInformation: function () {
    return this.verify.visible('@contactInfo', 'Contact Info is visible');
  }, // Merge the above two functions 

  openBillingContactModal: function () {
    this.click(`@updateContactDetails`)
  },
  // A generic function available for this, use that

  verifyBillingContactModalElement: function () {
    return this.waitForElementVisible('@updateContactModal', 'Modal is opened and visible')
      .verify.visible(`@firstNameInput`, 'FirstName input field is visible')
      .verify.visible(`@lastNameInput`, 'LastName input field is visible')
      .verify.visible(`@phoneNumberInput`, 'Phone number input field is visible')
      .verify.visible(`@emailAddrInput`, 'emailAddress field is available')
      .verify.visible(`@billingLine1Input`, 'Billing Line 1 input field is available')
      .verify.visible(`@billingLine2Input`, 'Billing Line 2 input field is available')
      .verify.visible(`@cityInput`, 'City Input field is visible')
      .verify.visible(`@stateInput`, 'state select type drop down is visible')
      .verify.visible(`@zipInput`, 'Zip Input field is visible')
      .verify.visible(`@cancelButton`, 'Cancel Button is visible')
      .verify.visible(`@SaveButton`, 'The save billing contact button is visible')

  },

  updateContactOperation: function (element, elementValue) {
    this.clearValue(element)
      .setValue(element, elementValue)
  }, // Generic function available

  saveContactDetails: function () {
    this.click('@SaveButton');
  },

  validateAvailableDetails: function (element) {
    return this.verify.visible(element, 'Details are visible')
      .elementText(element, 'are the available Details.')
  },

  validateUpdateLink: function (element) {
    return this.verify.visible(element, 'Link to Update Details is visible')
  },

  openUpdateModal: function (element1, element2) {
    return this.verify.visible(element1, 'Link to Update Details is visible')
      .click(element1)
      .verify.visible(element2, 'Update Modal is Opened')
  },

  updateDetails: function (element, newValue) {
    return this.verify.visible(element, 'is visible')
      .clearValue(element)
      .setValue(element, newValue)
  },

  changePaymentMethod: function (element) {
    return this.verify.visible(element, 'Radio button to select payment method is visible')
     .click(element)
  },

  validateUpdateModalCC: function(){
    return this.verify.visible('@paymentFirstNameInput', 'First Name field is visible')
      .verify.visible('@paymentLastNameInput', 'Last Name field is visible')
      .verify.visible('@creditCardInput', 'Credit Card fiels is visible')
      .verify.visible('@expirationMonthSelect', 'Expiration Month field is visible')
      .verify.visible('@expirationYearSelect', 'Expiration Year field is visible ')
      .verify.visible('@cvvInput', 'CVV field is visible')
      .verify.visible('@creditCardZipInput', 'Zip Code field is visible')
  },

  validateUpdateModalBankAccount: function(){
    return this.verify.visible('@paymentFirstNameInput', 'First Name field is visible')
      .verify.visible('@paymentLastNameInput', 'Last Name field is visible')
      .verify.visible('@bankNameInput', 'Bank Name fiels is visible')
      .verify.visible('@bankAccountNumberInput', 'Account Number field is visible')
      .verify.visible('@bankRoutingNumberInput', 'Routing Number field is visible ')
      .verify.visible('@bankAccountTypeSelect', 'Account Type field is visible')
  },

  billingHistory: function () {
    return this.waitForElementVisible('@historyTable', 'Records are visible in the billing history section')
      .verify.visible('@rowStatment', 'Row Statement is visible')
      .verify.visible('@loadMore', 'load more link text is visible')
      .verify.visible('@pdfModal', 'PDF Link is available for every record')

  },

  clickLoadMore: function () {
    this.click('@loadMore');
  },

  viewLessVisibility: function () {
    console.log("Number of Rows : " + rows)
    return this.verify.visible('@viewLess', 'The View Less link text is visible')
  },

  printHistoryData: function () {
    return this.elementText('@historyTable', ' : Is the Data available in History Section')
  }
}

module.exports = {
  commands: [billingCommands],
  url: function () {
    return this.api.launch_url + '/settings/organization/billing'
  },

  elements: {

    //------ Page Title -----//
    billingPage: {
      selector: `//DIV[@class = 'app-page__header__title'][text()='Billing & Plan']`,
      locateStrategy: 'xpath',
    },

    //------- Sections ------//
    planDetailsSection: {
      selector: `//DIV[@class = 'box__title'][text()='Plan Details']`,
      locateStrategy: 'xpath',
    },

    contactDetailSection: {
      selector: `//DIV[@class='box__title'][text()='Contact Details']`,
      locateStrategy: 'xpath',
    },

    paymentMethodSection: {
      selector: `//DIV[@class='box__title'][text()='Payment Method']`,
      locateStrategy: 'xpath',
    },

    historySection: {
      selector: `//DIV[@class='box__title'][text()='History']`,
      locateStrategy: 'xpath',
    },

    //------ Current Plan Section -----//
    planName: {
      selector: `//H4[@id='billing__planName']`,
      locateStrategy: 'xpath',
    },

    //try finding a better way to locate than indexing
    planAmount: {
      selector: `//SMALL[@class = 'u-text-small u-font-weight-normal'][contains(text(),'a month')]`,
      locateStrategy: 'xpath',
    },

    textMessageProduct: {
      selector: `//DIV[@class ='u-text-small'][text()='Text Messages']`,
      locateStrategy: 'xpath',
    },

    includedMessages: {
      selector: `//*[@id = 'billing__textMessage__planCount']`,
      locateStrategy: 'xpath',
    },

    membersProduct: {
      selector: `//DIV[@class ='u-text-small'][text()='Members']`,
      locateStrategy: 'xpath',
    },

    includedMembers: {
      selector: `//*[@id = 'billing__member__planCount']`,
      locateStrategy: 'xpath',
    },

    textChannelProduct: {
      selector: `//DIV[@class ='u-text-small'][text()='Text Channels']`,
      locateStrategy: 'xpath',
    },

    includedTextChannels: {
      selector: `//*[@id = 'billing__textChannel__planCount']`,
      locateStrategy: 'xpath',
    },

    integrationsProduct: {
      selector: `//DIV[text()='Integration']`,
      locateStrategy: 'xpath',
    },

    integrationsStatus: {
      selector: `//*[@id = 'billing__integrationCount']`,
      locateStrategy: 'xpath',
    },


    //------ Current Usage Section -----//
    currentUsageSection: {
      selector: `//H4[contains(text(),'Current Usage')]`,
      locateStrategy: 'xpath',
    },

    textMessageUsage: {
      selector: `//DIV[@class ='u-text-center u-text-small u-text-muted'][text()='Text Messages']`,
      locateStrategy: 'xpath',
    },

    usedTextMessage: {
      selector: `//*[@title ='Text Messages count']`,
      locateStrategy: 'xpath',
    },

    messageAnimator: {
      selector: `//*[contains(@style,'stroke-dashoffset')]`,
      locateStrategy: 'xpath',
    },

    membersUsage: {
      selector: `//DIV[@class ='u-text-center u-text-small u-text-muted'][text()='Members']`,
      locateStrategy: 'xpath',
    },

    usedMembers: {
      selector: `//*[@title ='Members count']`,
      locateStrategy: 'xpath',
    },

    textChannelUsage: {
      selector: `//DIV[@class ='u-text-center u-text-small u-text-muted'][text()='Text Channels']`,
      locateStrategy: 'xpath',
    },

    usedTextChannels: {
      selector: `//*[@title ='Text Channels count']`,
      locateStrategy: 'xpath',
    },

    //------ Add-Ons & Overages Section -----//
    addOnOveragesSection: {
      selector: `//H4[@class='u-m-t-large'][text()='Add-ons & Overages']`,
      locateStrategy: 'xpath',
    },

    description: {
      selector: `//TH[text()='Description']`,
      locateStrategy: 'xpath',
    },

    qty: {
      selector: `//TH[text()='Qty']`,
      locateStrategy: 'xpath',
    },

    unitPrice: {
      selector: `//TH[text()='Unit Price']`,
      locateStrategy: 'xpath',
    },

    total: {
      selector: `//TH[text()='Total']`,
      locateStrategy: 'xpath',
    },

    additionalMember: {
      selector: `//TBODY//TD[text()='Additional Members']`,
      locateStrategy: 'xpath',
    },

    additionalMemberQty: {
      selector: `//*[@id = 'billingEstimate__addons__members__quantity']`,
      locateStrategy: 'xpath',
    },

    additionalMemberUnitPrice: {
      selector: `//*[@id = 'billingEstimate__addons__members__costPerUnit']`,
      locateStrategy: 'xpath',
    },

    additionalMemberTotal: {
      selector: `//*[@id = 'billingEstimate__addons__members__total']`,
      locateStrategy: 'xpath',
    },

    additionalTextChannel: {
      selector: `//TBODY//TD[text()='Additional Text Channel']`,
      locateStrategy: 'xpath',
    },

    additionalTextChannelQty: {
      selector: `//*[@id = 'billingEstimate__addons__textChannel__quantity']`,
      locateStrategy: 'xpath',
    },

    additionalTextChannelUnitPrice: {
      selector: `//*[@id = 'billingEstimate__addons__textChannel__costPerUnit']`,
      locateStrategy: 'xpath',
    },

    additionalTextChannelTotal: {
      selector: `//*[@id = 'billingEstimate__addons__textChannel__total']`,
      locateStrategy: 'xpath',
    },

    //Additional Text Messages
    //Every 1000 messages over equals 1 overage
    additionalTextMessages: {
      selector: `//TD[text()='Additional Text Messages']`,
      locateStrategy: 'xpath',
    },

    overageMessage: {
      selector: `//SPAN[@class='u-text-small u-text-muted']`,
      locateStrategy: 'xpath',
    },

    additionalTextMessagesQty: {
      selector: `//*[@id = 'billingEstimate__addons__textMessages__quantity']`,
      locateStrategy: 'xpath',
    },

    additionalTextMessagesUnitPrice: {
      selector: `//*[@id = 'billingEstimate__addons__textMessages__costPerUnit']`,
      locateStrategy: 'xpath',
    },

    additionalTextMessagesTotal: {
      selector: `//*[@id = 'billingEstimate__addons__textMessages__total']`,
      locateStrategy: 'xpath',
    },


    //------ Estimated Bill Section -----//
    estimatedBillSection: {
      selector: `//H4[contains(text(),'Estimated Bill')]`,
      locateStrategy: 'xpath',
    },

    nextBillDate: {
      selector: `//SMALL[@class = 'u-text-small u-font-weight-normal'][contains(text(),'next bill')]`,
      locateStrategy: 'xpath',
    },

    planNameEstimatedBill: {
      selector: `//*[@id = 'billingEstimate__plan__name']`,
      locateStrategy: 'xpath',
    },

    planEstimatedCost: {
      selector: `//*[@id = 'billingEstimate__plan__cost']`,
      locateStrategy: 'xpath',
    },

    addOnOveragesEstimatedBill: {
      selector: `//*[@class='table table--condensed billing__estimate__table']//TD[contains(text(),'Add-ons & Overages')]`,
      locateStrategy: 'xpath',
    },

    addOnOveragesEstimatedCost: {
      selector: `//*[@id = 'billingEstimate__addons__total']`,
      locateStrategy: 'xpath',
    },

    totalEstimatedBill: {
      selector: `//*[@class = 'billing__estimate__table__footer']`,
      locateStrategy: 'xpath',
    },

    noteEstimatedBill: {
      selector: `//*[@class = 'u-text-small u-text-muted'][contains(text(),'Note')]`,
      locateStrategy: 'xpath',
    },

    //---------------------- Billing Contact Section //----------------------//
    updateContactModal: {
      selector: `//H3[@class='modal__header__title'][contains(text(),'Billing')]`,
      locateStrategy: 'xpath',
    },

    contactInfo: {
      selector: '(//DIV/P)[2]',
      locateStrategy: 'xpath',
    },

    updateContactDetails: {
      selector: `//SPAN[@class='button__text-wrapper'][contains(text(),'Update')]`,
      locateStrategy: 'xpath',
    },

    firstNameInput: { // Use keyword contact with contact section fields that might be common with Payment section
      selector: `//INPUT[@name='contactFirstName']`,
      locateStrategy: 'xpath'
    },

    lastNameInput: {
      selector: `//INPUT[@name='contactLastName']`,
      locateStrategy: 'xpath',
    },

    phoneNumberInput: {
      selector: `//INPUT[@name='contactPhone']`,
      locateStrategy: 'xpath',
    },

    emailAddrInput: {
      selector: `//INPUT[@name='contactEmail']`,
      locateStrategy: 'xpath',
    },

    billingLine1Input: {
      selector: `//INPUT[@name='street1']`,
      locateStrategy: 'xpath'
    },

    billingLine2Input: {
      selector: `//INPUT[@name='street2']`,
      locateStrategy: 'xpath'
    },

    cityInput: {
      selector: `//INPUT[@name='city']`,
      locateStrategy: 'xpath',
    },

    stateInput: {
      selector: `//SELECT[@name='state']`,
      locateStrategy: 'xpath'
    },

    zipInput: {
      selector: `//INPUT[@name='zip']`,
      locateStrategy: 'xpath',
    },

    cancelButton: {
      selector: `(//SPAN[@class='button__text-wrapper'][text()='Cancel'])[1]`,
      locateStrategy: 'xpath'
    },

    SaveButton: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Save Billing Contact']`,
      locateStrategy: 'xpath'
    },

    //---------------------- Payment Method Section //----------------------//
    paymentMethodDetails: {
      selector: `//*[@class = 'u-list u-list--space']`,
      locateStrategy: 'xpath',
    },

    namePaymentMethod: {
      selector: `//LI[@class ='u-font-weight-bold']`,
      locateStrategy: 'xpath',
    },

    //Available Payment Details - Credit Card
    creditCardNumber: {
      selector: `//LI[contains(text(),'Credit Card Number')]`,
      locateStrategy: 'xpath',
    },

    expirationDate: {
      selector: `//LI[contains(text(),'Expiration Date')]`,
      locateStrategy: 'xpath',
    },

    //Available Payment Details - Bank Account
    bankName: {
      selector: `//LI[contains(text(),'Bank Name')]`,
      locateStrategy: 'xpath',
    },

    routingNumber: {
      selector: `//LI[contains(text(),'Routing Number')]`,
      locateStrategy: 'xpath',
    },

    accountNumber: {
      selector: `//LI[contains(text(),'Account Number')]`,
      locateStrategy: 'xpath',
    },

    changePaymentMethodLink: {
      selector: `//SPAN[@class='button__text-wrapper'][contains(text(),'Change')]`,
      locateStrategy: 'xpath',
    },

    //Update Billing Payment Method Modal
    updatePaymentModal: {
      selector: `//*[@class = 'modal__header__title']`,
      locateStrategy: 'xpath',
    },

    radioCreditCard: {
      selector: `//LABEL[contains(text(),'Credit Card')]`,
      locateStrategy: 'xpath',
    },

    radioBankAccount: {
      selector: `//LABEL[contains(text(),'Bank Account')]`,
      locateStrategy: 'xpath',
    },

    paymentFirstNameInput: {
      selector: `//INPUT[contains(@name, 'firstName')]`,
      locateStrategy: 'xpath',
    },

    paymentLastNameInput: {
      selector: `//INPUT[contains(@name, 'lastName')]`,
      locateStrategy: 'xpath',
    },

    // Credit Card Form
    creditCardInput: {
      selector: `//INPUT[contains(@name, 'creditCardNumber')]`,
      locateStrategy: 'xpath',
    },

    expirationMonthSelect: {
      selector: `//SELECT[contains(@name, 'creditCardExpMonth')]`,
      locateStrategy: 'xpath',
    },

    expirationYearSelect: {
      selector: `//SELECT[contains(@name, 'creditCardExpYear')]`,
      locateStrategy: 'xpath',
    },

    cvvInput: {
      selector: `//INPUT[contains(@name, 'creditCardVerificationValue')]`,
      locateStrategy: 'xpath',
    },

    creditCardZipInput: {
      selector: `//INPUT[contains(@name, 'creditCardZip')]`,
      locateStrategy: 'xpath',
    },

    // Bank Account Form
    bankNameInput: {
      selector: `//INPUT[contains(@name, 'bankName')]`,
      locateStrategy: 'xpath',
    },

    bankAccountNumberInput: {
      selector: `//INPUT[contains(@name, 'bankAccountNumber')]`,
      locateStrategy: 'xpath',
    },

    bankRoutingNumberInput: {
      selector: `//INPUT[contains(@name, 'bankRoutingNumber')]`,
      locateStrategy: 'xpath',
    },

    bankAccountTypeSelect: {
      selector: `//SELECT[contains(@name, 'activeBankAccountTypeId')]`,
      locateStrategy: 'xpath',
    },

    cancelPaymentUpdateButton: {
      selector: `(//span[@class='button__text-wrapper'][text()='Cancel'])[2]`,
      locateStrategy: 'xpath',
    },

    savePaymentMethodButton: {
      selector: `//span[@class='button__text-wrapper'][text()='Save Payment Method']`,
      locateStrategy: 'xpath',
    },

     //---------------------- History Section //----------------------//
     historyTable: {
      selector: `//*[@id="app"]//div[2]//div[4]//div[2]/table`,
      locateStrategy: 'xpath'
    },

    rowStatment: {
      selector: `//DIV//P[@class='u-text-small u-text-muted u-m-b-small']`,
      locateStrategy: 'xpath'
    },

    loadMore: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='Load more']`,
      locateStrategy: 'xpath'
    },

    viewLess: {
      selector: `//SPAN[@class='button__text-wrapper'][text()='View less']`,
      locateStrategy: 'xpath'
    },

    pdfModal: {
      selector: `(//SPAN[@class='button__text-wrapper'][text()='PDF'])[1]`,
      locateStrategy: 'xpath'
    },

  }
}
