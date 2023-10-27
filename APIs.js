//export const Domain = "https://laswa.damdamtechnology.com/api/v1";
//export const DomainImage = "https://laswa.damdamtechnology.com";
//export const DomainSocket = "https://laswa.damdamtechnology.com/socket.io";

export const Domain = "http://172.20.10.3:3000/api/v1";
export const DomainSocket = "http://172.20.10.3:3000";

export const Login = `${Domain}/auth/Login`;
export const SignUp = `${Domain}/auth/SignUp`;
export const ActivateUser = `${Domain}/auth/ActivateUser`;
export const ResetPassword = `${Domain}/auth/ResetPassword`;
export const ConfirmResetPassword = `${Domain}/auth/ConfirmResetPassword`;

export const GetUserBoat = `${Domain}/Boat/GetUserBoat`;
export const AddBoat = `${Domain}/Boat/AddBoat`;

export const GetAuthUserTrips = `${Domain}/Trip/GetAuthUserTrips`;
export const GetBoatTrips = `${Domain}/Trip/GetBoatTrips`;
export const InitialStartTrip = `${Domain}/Trip/InitialStartTrip`;
export const AddPassengerToTrip = `${Domain}/Trip/AddPassengerToTrip`;
export const StartTrip = `${Domain}/Trip/StartTrip`;
export const ConfirmManifest = `${Domain}/Trip/ConfirmManifest`;
