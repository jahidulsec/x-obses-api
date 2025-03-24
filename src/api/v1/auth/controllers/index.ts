import { login } from "./users/login";
import { signUp } from "./users/sign-up";
import { verifyOtp } from "./users/verify-otp";
import { login as loginAdmin } from "./admins/login";
import { revokeAdminAccessToken } from "./token/revoke-admin";
import { revokeUserAccessToken } from "./token/revoke-user";

export = {
  login,
  signUp,
  verifyOtp,
  loginAdmin,
  revokeAdminAccessToken,
  revokeUserAccessToken
};
