export const getProficiencyFullName = (level: string): string => {
  switch (level.toLowerCase()) {
    case "beginner":
      return "Beginner (A1)";
    case "elementary":
      return "Elementary (A2)";
    case "intermediate":
      return "Intermediate (B1)";
    case "upper-intermediate":
      return "Upper-Intermediate (B2)";
    case "advanced":
      return "Advanced (C1)";
    case "proficient":
      return "Proficient (C2)";
    default:
      return "Unknown level";
  }
};
