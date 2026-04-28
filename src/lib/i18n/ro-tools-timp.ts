// RO tool fordítások – Timp kategória (Fázis 7)
// Évszám-ek build idején számolódnak (timp-years.ts) — minden új build automatikusan
// frissíti a "next year"-t a 4 fix ünnep title/description meta-jában (SEO friss).
import {
  CRACIUN_YEAR, CRACIUN_DATE_RO,
  REVELION_YEAR, REVELION_DATE_RO,
  PASTI_YEAR, PASTI_DATE_RO,
  BAC_YEAR, BAC_DATE_RO,
  CURRENT_YEAR,
} from "../timp-years.ts";

export const TIMP_RO: Record<string, { slug: string; title: string; h1: string; description: string; keywords: string[] }> = {
  "diferenta-date": {
    slug: "diferenta-date",
    title: "Calculator Diferență între Date – Zile, Săptămâni, Ani | InstrumenteOnline",
    h1: "Calculator Diferență între Date",
    description: `Calculator diferență între 2 date: zile, săptămâni, luni, ani + zile lucrătoare RO (cu sărbători legale ${CURRENT_YEAR}). Adunare/scădere de zile.`,
    keywords: ["diferenta date", "zile intre date", "zile lucratoare romania", `sarbatori legale ${CURRENT_YEAR}`, "calculator data", "scadere data", "adunare zile data"],
  },
  "craciun-numaratoare": {
    slug: "craciun-numaratoare",
    title: `Numărătoare Inversă Crăciun ${CRACIUN_YEAR} – Live cu Animație Ninsoare | InstrumenteOnline`,
    h1: "Numărătoare Inversă până la Crăciun",
    description: `Numărătoare inversă live până la Crăciun ${CRACIUN_DATE_RO} cu animație de ninsoare, zile/ore/minute/secunde și butoane partajare pentru rețele sociale.`,
    keywords: [`craciun ${CRACIUN_YEAR}`, "numaratoare craciun", "cate zile pana la craciun", "25 decembrie", "advent", "countdown craciun"],
  },
  "revelion-numaratoare": {
    slug: "revelion-numaratoare",
    title: `Numărătoare Inversă Revelion – La Mulți Ani ${REVELION_YEAR}! | InstrumenteOnline`,
    h1: "Numărătoare Inversă până la Revelion",
    description: `Numărătoare inversă live până la ${REVELION_DATE_RO} cu animație de artificii. Zile/ore/min/sec până la trecerea în Anul Nou și mesaj „La mulți ani!”.`,
    keywords: [`revelion ${REVELION_YEAR}`, "numaratoare revelion", "anul nou", "1 ianuarie", "countdown revelion", "la multi ani"],
  },
  "pasti-numaratoare": {
    slug: "pasti-numaratoare",
    title: `Numărătoare Inversă Paști Ortodox ${PASTI_YEAR} – Algoritm Meeus | InstrumenteOnline`,
    h1: "Numărătoare Inversă până la Paști",
    description: `Numărătoare inversă live până la Paștele ortodox ${PASTI_DATE_RO} calculat cu algoritmul Meeus pe calendarul iulian (+13 zile). Sărbătoare mobilă.`,
    keywords: [`pasti ${PASTI_YEAR}`, "pasti ortodox", "algoritm meeus", "calendar iulian", "numaratoare pasti", "sarbatoare mobila", "hristos a inviat"],
  },
  "zi-de-nastere": {
    slug: "zi-de-nastere",
    title: "Numărătoare Inversă Zi de Naștere – Personalizabilă cu Link | InstrumenteOnline",
    h1: "Numărătoare Inversă Zi de Naștere",
    description: "Numărătoare inversă personală până la următoarea aniversare. Date-picker + link partajabil cu prietenii (?data=YYYY-MM-DD).",
    keywords: ["zi de nastere", "aniversare countdown", "ziua mea", "calculator varsta", "share link aniversare"],
  },
  "generator-numaratoare": {
    slug: "generator-numaratoare",
    title: "Generator Numărătoare Inversă – Eveniment Personalizat cu URL | InstrumenteOnline",
    h1: "Generator Numărătoare Inversă",
    description: "Creează propria numărătoare inversă pentru orice eveniment: nume + dată + emoji + link partajabil. URL encoded pentru distribuire.",
    keywords: ["generator countdown", "numaratoare personalizata", "eveniment countdown", "share countdown link", "numaratoare custom"],
  },
  "cate-zile-am": {
    slug: "cate-zile-am",
    title: "Câte Zile Am Trăit – Calculator Vârstă Live cu Mérföldkövek | InstrumenteOnline",
    h1: "Câte Zile Am Trăit?",
    description: "Calculator de vârstă live: vezi câte zile, ore, minute și secunde ai trăit. Mérföldkövek: 10 000 zile, 1 miliard secunde, 1 milion minute.",
    keywords: ["cate zile am trait", "calculator varsta", "varsta in zile", "varsta secunde", "milestones varsta", "live age clock"],
  },
  "bacalaureat-numaratoare": {
    slug: "bacalaureat-numaratoare",
    title: `Numărătoare Inversă BAC ${BAC_YEAR} – Sesiunea de Vară cu Motivație | InstrumenteOnline`,
    h1: "Numărătoare Inversă până la Bacalaureat",
    description: `Numărătoare inversă live până la Bacalaureatul RO sesiunea de vară (~${BAC_DATE_RO}). Mesaje motivaționale + plan studiu.`,
    keywords: [`bacalaureat ${BAC_YEAR}`, `bac ${BAC_YEAR} countdown`, "numaratoare bac", "plan studiu bac", "examen maturitate", "sesiune vara"],
  },
};
