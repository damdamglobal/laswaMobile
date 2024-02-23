export const Domain = "https://laswa.damdamtechnology.com/api/v1";
export const DomainImage = "https://laswa.damdamtechnology.com";
export const DomainSocket = "https://laswa.damdamtechnology.com/socket.io";

//export const Domain = "http://192.168.100.40:3000/api/v1";
//export const DomainSocket = "http://192.168.100.40:3000";

export const Login = `${Domain}/auth/Login`;
export const SignUp = `${Domain}/auth/SignUp`;
export const ActivateUser = `${Domain}/auth/ActivateUser`;
export const ResetPassword = `${Domain}/auth/ResetPassword`;
export const ConfirmResetPassword = `${Domain}/auth/ConfirmResetPassword`;
export const SearchUser = `${Domain}/auth/SearchUser`;
export const ChangePassword = `${Domain}/auth/ChangePassword`;
export const SetBusinessProfile = `${Domain}/auth/SetBusinessProfile`;
export const BusinessUploadDoc = `${Domain}/auth/BusinessUploadDoc`;
export const GetBusinessProfile = `${Domain}/auth/GetBusinessProfile`;
export const BusinessProfileUpdate = `${Domain}/auth/BusinessProfileUpdate`;
export const ResetOperatorPassword = `${Domain}/auth/ResetOperatorPassword`;

export const GetUserBoat = `${Domain}/Boat/GetUserBoat`;
export const AddBoat = `${Domain}/Boat/AddBoat`;
export const AssignUserToBoat = `${Domain}/Boat/AssignUserToBoat`;
export const RemoveCaptain = `${Domain}/Boat/RemoveCaptain`;
export const AddOperator = `${Domain}/Boat/AddOperator`;
export const UpdateOperator = `${Domain}/Boat/UpdateOperator`;
export const UploadOperatorDoc = `${Domain}/Boat/UploadOperatorDoc`;
export const GetUserOperators = `${Domain}/Boat/GetUserOperators`;
export const UploadBoatDoc = `${Domain}/Boat/UploadBoatDoc`;
export const SearchOperator = `${Domain}/Boat/SearchOperator`;
export const SuspendOperator = `${Domain}/Boat/SuspendOperator`;
export const UnSuspendOperator = `${Domain}/Boat/UnSuspendOperator`;

export const GetAuthUserTrips = `${Domain}/Trip/GetAuthUserTrips`;
export const GetBoatTrips = `${Domain}/Trip/GetBoatTrips`;
export const InitialStartTrip = `${Domain}/Trip/InitialStartTrip`;
export const AddPassengerToTrip = `${Domain}/Trip/AddPassengerToTrip`;
export const StartTrip = `${Domain}/Trip/StartTrip`;
export const ConfirmManifest = `${Domain}/Trip/ConfirmManifest`;
export const EndTrip = `${Domain}/Trip/EndTrip`;
export const CancelTrip = `${Domain}/Trip/CancelTrip`;
export const SearchPassenger = `${Domain}/Trip/SearchPassenger`;

export const GetTerminals = `${Domain}/terminal/GetTerminals`;
