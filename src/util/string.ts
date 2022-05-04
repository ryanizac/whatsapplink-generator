export function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

type ClassList = string | undefined | null;

interface ClassLogic {
  logic: boolean;
  classlist: ClassList;
}

export function mergeClass(
  ...classlist: Array<ClassList | ClassLogic>
): string {
  return classlist
    .map((cl) => {
      const isObject = typeof cl === "object" && !Array.isArray(cl);
      if (isObject) return cl?.logic ? cl.classlist : "";
      return cl;
    })
    .filter((cl) => !!cl)
    .join(" ");
}

export function copyTextToClipboard(value: string) {
  navigator.clipboard.writeText(value);
}
