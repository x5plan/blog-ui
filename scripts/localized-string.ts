import { resolve as pathResolve } from "path";
import fs from "fs";
import { load as yamlLoad, dump as yamlDump } from "js-yaml";

const supportedLanguages = ["en", "zh-cn"];

const defaultLanguage = "en";

const localeDir = pathResolve(__dirname, "..", "..", "i18n-strings");
const staticDir = pathResolve(__dirname, "..", "..", "src", "assets", "locales");
const typesFilePath = pathResolve(
    __dirname,
    "..",
    "..",
    "src",
    "Features",
    "LocalizedString",
    "locale.d.ts",
);

interface ILocalizedString {
    name: string;
    value: string;
    description: string;
    raw?: string;
}

type IStringIdMap = Record<string, number>;

main();

function main() {
    const rawStrings = getRawStrings();
    const idMap = generateLocalizedStringId(rawStrings);
    const typeContent = generateTypes(rawStrings, idMap);

    for (const lang of supportedLanguages) {
        const localizedStrings = getLocalizedString(lang);
        const strings = convertRawToLocalizedString(rawStrings, localizedStrings, lang);
        writeLocale(lang, strings, idMap);
        setLocalizedString(lang, strings);
    }
    writeTypes(typeContent);
}

function generateTypes(localizedStrings: ILocalizedString[], idMap: IStringIdMap): string {
    let content = "";

    // Generate locale enum, map localized string name to id
    content += "export const enum CE_Locale {\n";
    for (const localizedString of localizedStrings) {
        const id = idMap[localizedString.name];
        content += `/**  
        * Value: ${localizedString.value ?? "BAD STRING"}; 
        * Description: ${localizedString.description};
        */\n`;
        content += `${localizedString.name}=0x${id.toString(16)},\n\n`;
    }
    content += "}\n\n";

    // Generate localized string interface, map id to value
    content += "export interface ILocalizedStrings {\n";
    for (const localizedString of localizedStrings) {
        const id = idMap[localizedString.name];
        content += `[CE_Locale.${localizedString.name}]: ${JSON.stringify(localizedString.value ?? "BAD STRING")}; // ${id.toString(16)}\n`;
    }
    content += "}\n\n";

    return content;
}

function generateLocalizedStringId(localizedStrings: ILocalizedString[]): IStringIdMap {
    const result: IStringIdMap = {};
    localizedStrings.forEach((localizedString, index) => {
        result[localizedString.name] = index;
    });
    return result;
}

function getLocalizedString(lang: string): ILocalizedString[] {
    const filePath = pathResolve(localeDir, `localized-strings.${lang}.yaml`);    
    if (!fs.existsSync(filePath)) {
        return [];
    }

    return yamlLoad(fs.readFileSync(filePath, "utf-8")) as ILocalizedString[];
}

function setLocalizedString(lang: string, strings: ILocalizedString[]) {
    const filePath = pathResolve(localeDir, `localized-strings.${lang}.yaml`);
    fs.writeFileSync(filePath, yamlDump(strings).replace(/\n\-/g, "\n\n-"));
}

function getRawStrings(): ILocalizedString[] {
    const rawStringFilePath = pathResolve(localeDir, "raw-strings.yaml");
    return yamlLoad(fs.readFileSync(rawStringFilePath, "utf-8")) as ILocalizedString[];
}

function writeTypes(content: string) {
    fs.writeFileSync(typesFilePath, content);
}

function writeLocale(lang: string, strings: ILocalizedString[], idMap: IStringIdMap) {
    fs.mkdirSync(staticDir, { recursive: true });
    const filePath = pathResolve(staticDir, `strings.${lang}.js`);
    const content = strings.reduce<Record<number, string>>(
        (pre, cur) => ({
            ...pre,
            [idMap[cur.name]]: cur.value ?? cur.raw ?? "BAD STRING",
        }),
        {},
    );
    fs.writeFileSync(filePath, `export default ${JSON.stringify(content, null, 4)}`);
}

function convertRawToLocalizedString(
    rawStrings: ILocalizedString[],
    localizedString: ILocalizedString[],
    lang: string,
): ILocalizedString[] {
    return rawStrings.map((rawString) => {
        if (lang === defaultLanguage) {
            return {
                name: rawString.name,
                value: rawString.value,
                description: rawString.description,
                raw: rawString.value ?? "BAD STRING",
            };
        }

        const localized = localizedString.find((ls) => ls.name === rawString.name);
        return {
            name: rawString.name,
            value: localized && localized.raw === rawString.value ? localized.value : null,
            description: rawString.description,
            raw: rawString.value ?? "BAD STRING",
        };
    });
}
