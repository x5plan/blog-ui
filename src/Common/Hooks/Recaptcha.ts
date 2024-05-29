import { useGoogleReCaptcha } from "react-google-recaptcha-v3-safe";

import { getRecaptchaEnabled } from "@/Features/Config/Selectors";
import { useAppSelector } from "@/Features/Store/Store";

import type { IRecaptchaAsync } from "../Types/Recaptcha";

export const useRecaptchaAsync = (): IRecaptchaAsync => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const recaptchaEnabled = useAppSelector(getRecaptchaEnabled);

    return recaptchaEnabled
        ? async (action) => {
              try {
                  return await executeRecaptcha(action);
              } catch (e) {
                  console.error("Recaptcha Error:", e);
                  return "";
              }
          }
        : async () => "";
};
