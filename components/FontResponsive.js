import { scale, verticalScale, moderateScale } from "react-native-size-matters";

export function actuatedNormalize(size) {
  return moderateScale(size);
}
export function VerticalScale(size) {
  return verticalScale(size);
}
export function Scale(size) {
  return scale(size);
}
