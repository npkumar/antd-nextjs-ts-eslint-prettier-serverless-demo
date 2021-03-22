export enum HOTEL_CREDENTIAL_STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface HOTEL_CREDENTIAL {
  id: string;
  hotelName: string;
  hotelId: string;
  systemId: string;
  pmsUserId: string;
  pmsPassword: string;
  status: HOTEL_CREDENTIAL_STATUS;
  createdAt: string;
  updatedAt: string;
  deactivatedAt: string;
}
