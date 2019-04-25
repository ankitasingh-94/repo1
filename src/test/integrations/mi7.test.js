/* eslint-disable no-undef */
import * as rhinofeeder from '../../services/Rhinofeeder.service';
import * as rhinoapi from '../../services/Rhinoapi.service';
import { localToUtc } from '../../toolboxes/helpers.toolbox';

const orgId = process.env.EXISTING_ORG_ID;
let createdPatient;
let createdAppointment;

const patientPayload = {
  EventTypeCode: 'A04',
  RecordedDate: '2015-04-24T02:27:00Z',
  SendingApplication: 'Demo System',
  SendingFacility: 'MI7 HQ',
  ReceivingApplication: 'Your App',
  ReceivingFacility: 'Your Location',
  TimeStamp: '2015-04-24T02:27:00Z',
  MessageType: 5,
  MessageID: 'Msg66',
  TestingFlag: false,
  HL7MessageType: 2,
  PatientIDSetIdentifier: '1',
  PatientID_MI7: '292801',
  PatientID_EMR: '292801',
  PatientID_Alt: '292801',
  FirstName: 'James',
  LastName: 'Bond',
  Title: 'Mr.',
  DOB: '1973-05-01T00:00:00',
  Gender: 'M',
  GenderMale: true,
  Address1: '100 Main Street',
  City: 'Austin',
  State: 'TX',
  StateAbbreviation: 'TX',
  Postal: '78701',
  Country: 'USA',
  HomePhone: '(512)555-1212',
  CellPhone: '(512)555-1214',
  HomeEmailAddress: 'james@bond.com',
  WorkPhone: '(512)555-1213',
  MaritalStatus: 'U',
  AccountNumber: '292801',
  SSN: '555-22-1111',
  PatientClass: 'R',
  AssignedLocationPOC: 'MI7 Medical Offices',
  AssignedLocationFacility: '1',
  AttendingID: '5',
  AttendingFirstName: 'Doctor',
  AttendingLastName: 'No',
};

const updatePatientPayload = {
  ...patientPayload,
  MessageType: 6,
  MessageID: 'Msg67',
  FirstName: 'Jimmy',
  LastName: 'Gold',
  DOB: '1976-05-01T00:00:00',
  HomePhone: '(512)555-1213',
};

const startDate = new Date();
startDate.setMinutes(startDate.getMinutes() + 5);
startDate.setDate(startDate.getDate() + 1);
let startDateString = localToUtc(startDate, 'America/New_York');
const endDate = new Date();
endDate.setMinutes(endDate.getMinutes() + 30);
endDate.setDate(endDate.getDate() + 1);
let endDateString = localToUtc(endDate, 'America/New_York');

const appointmentPayload = {
  AppointmentLocationSetIdentifier: '1',
  AppointmentLocationPOC: 'MI7 Medical Offices',
  AppointmentLocationFacility: '1',
  PersonnelSetIdentifier: '1',
  PersonnelID: '22',
  PersonnelLastName: 'No',
  PersonnelStatusCode: 'BOOKED',
  PersonnelStatusCodeText: 'BOOKED',
  SendingApplication: 'Demo System',
  SendingFacility: 'MI7 HQ',
  ReceivingApplication: 'Your App',
  ReceivingFacility: 'Your Location',
  TimeStamp: '2015-04-24T02:17:00Z',
  MessageType: 1,
  MessageID: 'Msg610',
  TestingFlag: false,
  HL7MessageType: 1,
  PatientIDSetIdentifier: '1',
  PatientID_MI7: '292801',
  PatientID_EMR: '292801',
  PatientID_Alt: '292801',
  FirstName: 'James',
  LastName: 'Bond',
  DOB: '1973-01-02T00:00:00',
  Gender: 'M',
  GenderMale: true,
  Address1: '100 Main Street',
  Address2: 'Suite 102',
  City: 'Austin',
  State: 'TX',
  StateAbbreviation: 'TX',
  Postal: '78701',
  Country: 'USA',
  HomePhone: '(512)555-1212',
  CellPhone: '(512)555-1214',
  HomeEmailAddress: 'james@bond.com',
  WorkPhone: '(512)555-1213',
  MaritalStatus: 'U',
  AccountNumber: '322800',
  SSN: '999-55-6666',
  PatientClass: 'R',
  AssignedLocationPOC: 'MI7 Medical Offices',
  AssignedLocationFacility: '1',
  AttendingID: '5',
  AttendingFirstName: 'Doctor',
  AttendingLastName: 'No',
  StartDate: startDateString,
  EndDate: endDateString,
  PlacerID: '73',
  FillerID: '73',
  AppointmentReasonCode: '210',
  AppointmentReason: 'Consult',
  AppointmentTypeCode: '44',
  AppointmentType: 'Initial Consult',
  Appointment_Duration: 30,
  EnteredByID: '7',
  EnteredByLastName: 'No',
};

startDate.setMinutes(startDate.getMinutes() + 5);
startDate.setDate(startDate.getDate() + 1);
startDateString = localToUtc(startDate, 'America/New_York');
endDate.setMinutes(endDate.getMinutes() + 30);
endDate.setDate(endDate.getDate() + 1);
endDateString = localToUtc(endDate, 'America/New_York');

const updateAppointmentPayload = {
  ...appointmentPayload,
  PersonnelStatusCode: 'UPDATED',
  PersonnelStatusCodeText: 'UPDATED',
  MessageType: 3,
  MessageID: 'Msg613',
  StartDate: startDateString,
  EndDate: endDateString,
};

const cancelAppointmentPayload = {
  ...appointmentPayload,
  PersonnelStatusCode: 'CANCELLED',
  PersonnelStatusCodeText: 'CANCELLED',
  MessageType: 4,
  MessageID: 'Msg614',
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('integration tests', () => {
  jest.setTimeout(30000);
  test('new patient inbound message', async (done) => {
    await rhinofeeder.postMi7InboundMessage(patientPayload);
    done();
  });

  test('find new patient', async (done) => {
    await sleep(5000);
    const response = await rhinoapi.getUserByExternalId(orgId, patientPayload.PatientID_EMR);
    expect(response.data.externalIds.emrId).toBe(patientPayload.PatientID_EMR);
    createdPatient = response.data;
    done();
  });

  test('update patient inbound message', async (done) => {
    await rhinofeeder.postMi7InboundMessage(updatePatientPayload);
    done();
  });

  test('find updated patient', async (done) => {
    await sleep(5000);
    const response = await rhinoapi.getUserByExternalId(orgId, updatePatientPayload.PatientID_EMR);
    expect(response.data.externalIds.emrId).toBe(updatePatientPayload.PatientID_EMR);
    done();
  });

  test('new appointment inbound message', async (done) => {
    await rhinofeeder.postMi7InboundMessage(appointmentPayload);
    done();
  });

  test('find new appointment', async (done) => {
    await sleep(5000);
    const response = await rhinoapi.getApointmentByExternalId(orgId, appointmentPayload.PlacerID, createdPatient.id);
    expect(response.data.externalId).toBe(appointmentPayload.PlacerID);
    expect(response.data.userId).toBe(createdPatient.id);
    createdAppointment = response.data;
    done();
  });

  test('update appointment inbound message', async (done) => {
    await rhinofeeder.postMi7InboundMessage(updateAppointmentPayload);
    done();
  });

  test('find updated appointment', async (done) => {
    await sleep(5000);
    const response = await rhinoapi.getApointmentByExternalId(orgId, updateAppointmentPayload.PlacerID, createdPatient.id);
    expect(response.data.externalId).toBe(updateAppointmentPayload.PlacerID);
    expect(response.data.userId).toBe(createdPatient.id);
    createdAppointment = response.data;
    done();
  });

  test('cancel appointment inbound message', async (done) => {
    await rhinofeeder.postMi7InboundMessage(cancelAppointmentPayload);
    done();
  });

  test('find cancelled appointment', async (done) => {
    await sleep(5000);
    const response = await rhinoapi.getApointmentByExternalId(orgId, cancelAppointmentPayload.PlacerID, createdPatient.id);
    expect(response.data.externalId).toBe(cancelAppointmentPayload.PlacerID);
    expect(response.data.userId).toBe(createdPatient.id);
    createdAppointment = response.data;
    done();
  });
});
