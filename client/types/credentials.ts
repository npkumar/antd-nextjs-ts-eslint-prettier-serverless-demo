export enum HOTEL_CREDENTIAL_STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface HOTEL_CREDENTIALS {
  id: string;
  hotelName: string;
  systemId: string;
  pmsUserId: string;
  pmsPassword: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deactivatedAt: string;
}
