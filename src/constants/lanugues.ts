import US from "country-flag-icons/react/3x2/US";
import RU from "country-flag-icons/react/3x2/RU";
import UZ from "country-flag-icons/react/3x2/UZ";
import KO from "country-flag-icons/react/3x2/KR";
import VI from "country-flag-icons/react/3x2/VN";
import TH from "country-flag-icons/react/3x2/TH";
import CH from "country-flag-icons/react/3x2/CH";
import PH from "country-flag-icons/react/3x2/PH";
import ID from "country-flag-icons/react/3x2/ID";
import KH from "country-flag-icons/react/3x2/KH";
import LK from "country-flag-icons/react/3x2/LK";
import MM from "country-flag-icons/react/3x2/MM";

export const LANGUAGES = [
  { code: "en", name: "English", icon: US },

  { code: "ru", name: "Русский", icon: RU },
  { code: "uz", name: "Oʻzbekcha", icon: UZ },
  { code: "ko", name: "한국어", icon: KO },
  { code: "vi", name: "Tiếng Việt", icon: VI },
  { code: "th", name: "ไทย", icon: TH },
  { code: "zh", name: "中文", icon: CH },
  { code: "ph", name: "Filipino", icon: PH },
  { code: "id", name: "Bahasa Indonesia", icon: ID },
  { code: "kh", name: "ភាសាខ្មែរ", icon: KH },
  { code: "lk", name: "සිංහල", icon: LK },
  { code: "mm", name: "မြန်မာဘာသာ", icon: MM },
] as const;

// export const FLAGS = {
//   en: React.lazy(() => import("country-flag-icons/react/3x2/US")),
//   ru: React.lazy(() => import("country-flag-icons/react/3x2/RU")),
//   uz: React.lazy(() => import("country-flag-icons/react/3x2/UZ")),
//   ko: React.lazy(() => import("country-flag-icons/react/3x2/KR")),
//   vi: React.lazy(() => import("country-flag-icons/react/3x2/VN")),
//   lk: React.lazy(() => import("country-flag-icons/react/3x2/LK")),
//   th: React.lazy(() => import("country-flag-icons/react/3x2/TH")),
//   ph: React.lazy(() => import("country-flag-icons/react/3x2/PH")),
//   id: React.lazy(() => import("country-flag-icons/react/3x2/ID")),
//   kh: React.lazy(() => import("country-flag-icons/react/3x2/KH")),
//   mm: React.lazy(() => import("country-flag-icons/react/3x2/MM")),
//   zh: React.lazy(() => import("country-flag-icons/react/3x2/CN")),
// };
