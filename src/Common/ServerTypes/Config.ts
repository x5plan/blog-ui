export interface IAppConfig {
    readonly appName: string;
    readonly recaptchaEnabled: boolean;
    readonly recaptchaSiteKey: string;
    readonly useRecaptchaNet: boolean;
}
