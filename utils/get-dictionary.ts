import "server-only";
import type { Dictionary } from "@/dictionaries/types";
import { getEnvData } from "@/utils/env-data";

const dictionaries = {
    en: () =>
        import("../dictionaries/en.json").then(
            (module) => module.default as unknown as Dictionary,
        ),
    id: () =>
        import("../dictionaries/id.json").then(
            (module) => module.default as unknown as Dictionary,
        ),
};

function injectEnvData(dict: Dictionary): Dictionary {
    const envData = getEnvData();

    return {
        ...dict,
        contact: {
            ...dict.contact,
            phone: envData.contact.phone,
            address: envData.contact.address,
        },
        partners: {
            ...dict.partners,
            list: dict.partners.list.map((partner) => {
                if (partner.id === "audy-rahmat") {
                    return { ...partner, email: envData.partners.audyEmail };
                }
                if (partner.id === "andelton-antoni") {
                    return { ...partner, email: envData.partners.antoniEmail };
                }
                return partner;
            }),
        },
        career: {
            ...dict.career,
            email: envData.career.email,
        },
    };
}

export const getDictionary = async (
    locale: "en" | "id",
): Promise<Dictionary> => {
    const dict = await (dictionaries[locale]?.() ?? dictionaries.en());
    return injectEnvData(dict);
};
