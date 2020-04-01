export interface IGetPrescriptionsParameter {
  dateFrom: Date,
  dateTo: Date,
  patientId: number,
  pharmacyId: number,
  status: string,
  page: number
}
