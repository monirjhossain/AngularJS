export interface AppointmentDto {
    appointmentId: number;
    customer: string;
    doctor: string;
    department: string;
    date: string;
    slotDate: string;
    slotStartTime: string;
    slotEndTime: string;
    payment: number;
    employeeId: number;
  }