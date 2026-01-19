export const getProficiencyProgress = (level: string) => {
  switch (level.toLowerCase()) {
    case "beginner": // A1
      return 20;
    case "elementary": // A2
      return 40;
    case "intermediate": // B1
      return 60;
    case "upper-intermediate": // B2
      return 70;
    case "advanced": // C1
      return 85;
    case "proficient": // C2
      return 100;
    default:
      return 0;
  }
};
