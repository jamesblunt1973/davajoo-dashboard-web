export interface IPrescription {
  id: number,
  createDate: string,
  elapsed?: string,
  description: string,
  otc: string | Array<string>,
  status: number,
  isPwa: boolean,
  totalCount: number,
  patient: PrescriptionUser,
  images: PrescriptionImage[],
  pharmacies: PrescriptionPharmacy[]
}

class PrescriptionImage {
  id: number;
  fileName: string
}

class PrescriptionPharmacy {
  id: number;
  name: string;
}

class PrescriptionUser {
  id: number;
  name: string;
  nationalCode: string
}
