import { JwtPayload, verify } from "jsonwebtoken";
import { supabase } from "../../../app/utils/supabase";
import { REFRESH_SECRET } from "../../../const";
import { findOne } from "../../../utils/token/findOne";
import { handleTokens } from "../../../utils/token/handleTokens";
import { ProfileService } from "../profile/profile.service";

export const AuthService = {
  async refresh(refreshToken: string) {
    if (!refreshToken) {
      return null;
    }

    const tokenFromDB = await findOne(refreshToken);
    const tokenData = verify(refreshToken, REFRESH_SECRET);

    if (!tokenFromDB || !tokenData) {
      console.log({
        tokenFromDB,
        tokenData,
      });

      return null;
    }

    const profile = await ProfileService.byAuthId(
      (tokenData as { authId: number }).authId
    );

    const payload = {
      email: (tokenData as { email: string }).email,
      authId: (tokenData as { authId: number }).authId,
    };

    const tokens = await handleTokens(payload);

    return {
      tokens,
      profile,
    };
  },

  async getByEmail(email: string) {
    const { data } = await supabase
      .from("auth")
      .select()
      .filter("email", "eq", email)
      .single();

    return data;
  },
};
