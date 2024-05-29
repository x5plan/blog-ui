import { highlight as h, languages } from "prismjs";

import { escapeHtml } from "@/Common/Utilities/Html";

function normalizeLanguageName(language: string) {
    return language.trim().toLowerCase();
}

function normalizeCode(code: string) {
    return code.replace(/\r\n/g, "\n");
}

export function highlight(code: string, lang: string) {
    code = normalizeCode(code);
    lang = normalizeLanguageName(lang);
    if (lang && languages[lang]) {
        try {
            return h(code, languages[lang], lang);
        } catch (e) {
            console.error(`Failed to highlight, language = ${lang}`, e);
        }
    }
    return escapeHtml(code).split("\n").join("<br>");
}
