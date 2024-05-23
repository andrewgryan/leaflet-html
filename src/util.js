// Utility functions
export const kebabToCamel = (kebab) => kebab.replace(/-./g, (x) => x[1].toUpperCase());
export const camelToKebab = (s) => {
   return s.split('').map((letter, idx) => {
     return letter.toUpperCase() === letter
      ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
      : letter;
   }).join('');
}

