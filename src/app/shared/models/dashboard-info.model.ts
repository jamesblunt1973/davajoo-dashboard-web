export interface IDashboardInfo {
  pharmacies: number,
  patients: number,
  prescriptions: number,
  delivered: number,
  activePharmacies: IActivePharmacy[],
  dailyPrescriptions: IPrescriptionInfo[]
}

export interface IActivePharmacy {
  name: string,
  count: number
}

export interface IPrescriptionInfo {
  date: string,
  total: number,
  delivered: number,
  canceled: number
}
