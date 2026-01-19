export const getProficiencyColor = (level: string) => {
  switch (level.toLowerCase()) {
    case "beginner": // A1
      return "bg-orange-50 text-orange-700 border-orange-200";
    case "elementary": // A2
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "intermediate": // B1
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "upper-intermediate": // B2
      return "bg-lime-50 text-lime-700 border-lime-200";
    case "advanced": // C1
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "proficient": // C2
      return "bg-green-50 text-green-700 border-green-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};
