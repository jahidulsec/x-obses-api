import { login } from "./users/login";
import { signUp } from "./users/sign-up";
import { verifyOtp } from "./users/verify-otp";
import { login as loginAdmin } from "./admins/login";

export = {
  login,
  signUp,
  verifyOtp,
  loginAdmin
};
