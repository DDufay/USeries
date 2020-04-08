export const ValidateNotEmpty = value => value ? undefined : 'Veuillez remplir le champ';
export const ValidateLength = (value, length) => value.length >= length ? undefined : `Ce champ doit contenir au moins ${length} caractères`;
export const ValidateSameValue = (value, otherValue) => value === otherValue ? undefined : 'Les 2 champs doivent être identiques';
/**
 * Check if email is valid and contain the right format
 * @param value
 * @returns {*}
 */
export const ValidateEmail = value =>
    (!value || !/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(value)
        ? 'Adresse email invalide'
        : undefined);
