// lib/utils/date-utils.ts

export function formatDate(
  dateValue: Date | string | number | null | undefined
): string {
  if (!dateValue) return "";

  // Si c'est déjà une chaîne, la retourner
  if (typeof dateValue === "string") return dateValue;

  // Si c'est un objet Date, le formater
  if (dateValue instanceof Date) {
    return dateValue.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // Essayer de convertir tout autre type en Date
  try {
    const date = new Date(dateValue);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (e) {
    console.error("Erreur de formatage de date:", e);
    return String(dateValue); // Conversion de secours
  }
}

export function formatDateTimeAttribute(
  dateValue: Date | string | number | null | undefined
): string {
  if (!dateValue) return "";

  // Si c'est déjà une chaîne qui ressemble à une date ISO, la retourner
  if (typeof dateValue === "string" && dateValue.match(/^\d{4}-\d{2}-\d{2}/)) {
    return dateValue;
  }

  // Tenter de convertir en objet Date
  try {
    const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
    return date.toISOString().split("T")[0]; // Format YYYY-MM-DD
  } catch (e) {
    console.error("Erreur de formatage d'attribut datetime:", e);
    return "";
  }
}
