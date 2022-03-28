/**
 * Récupère et retourne de manière aléatoire un élément du tableau passé en paramètre.
 * @param {String[]} array Le tableau de référence
 * @returns {String} un élément aléatoire du tableau
 */
export function pickFromArray(array) {
	return array[Math.floor(Math.random() * array.length)];
}

/**
 * Retourne un nombre aléatoire compris entre les deux nombres passés en paramètre
 * @param {number} min La valeur minimale à choisir
 * @param {number} max La valeur maximale à choisir
 * @returns Un nombre aléatoire entre min et max
 */
export function randint(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
