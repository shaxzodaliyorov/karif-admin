export const getLanguageFlag = (language: string) => {
  const flags: { [key: string]: string } = {
    english: "🇺🇸",
    uzbek: "🇺🇿",
    russian: "🇷🇺",
    german: "🇩🇪",
    spanish: "🇪🇸",
    french: "🇫🇷",
    chinese: "🇨🇳",
    japanese: "🇯🇵",
  };
  return flags[language.toLowerCase()] || "🌍";
};
