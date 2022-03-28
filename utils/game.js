// @ts-check

import {
	collection,
	addDoc,
	DocumentReference,
	setDoc,
	doc,
	where,
	query,
	getDocs,
	deleteDoc,
	getDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { pickFromArray, randint } from "./helpers";
import { auth } from "./firebase";

/**
 * @typedef {Object} Carte Une carte de UNO se définit par une couleur et une valeur
 * @property {number} value
 * @property {string} color
 */

/**
 * @typedef {Object} Joueur Une instance de joueur UNO
 * @property {string} name
 * @property {Carte[]} cards
 * @property {boolean} host
 */

/**
 * @typedef {object} lobbyData Document stocké dans la collection appmob_lobby
 * @property {string} name
 * @property {Carte} pioche
 * @property {boolean} started
 * @property {Joueur[]} users
 * @property {number} playingId
 */

// Ne pas oublier de faire try catch
/**
 * Crée une nouvelle partie dans firebase
 * @param {string} name Le nom de la partie
 * @return {Promise<DocumentReference<lobbyData>>} une promise retournant le document nouvellement créé
 */
export async function newLobby(name) {
	/**
	 * @type {lobbyData}
	 */
	const data = {
		name,
		pioche: createCard(),
		started: false,
		users: [new UnoUser(auth.currentUser.email).makeHost().get()],
		playingId: 0,
	};
	const docRef = await addDoc(collection(db, "appmob_lobby"), data);
	// @ts-ignore
	return docRef;
}

export async function startLobby(id) {
	await setDoc(
		doc(db, "appmob_lobby", id),
		{ started: true },
		{ merge: true }
	);
}

export async function joinLobby(document) {
	const data = document.data();

	for (const user of data.users) {
		if (user.name === auth.currentUser.email) {
			console.error("Vous êtes déjà dans la partie (wtf ?)");
			return;
		}
	}

	data.users.push(new UnoUser(auth.currentUser.email).get());

	await setDoc(doc(db, "appmob_lobby", document.id), data, { merge: true });
}

export async function searchLobby(name) {
	const q = query(
		collection(db, "appmob_lobby"),
		where("name", ">=", name),
		where("name", "<=", name + "\uf8ff"),
		where("started", "==", false)
	);
	const querySnapshot = await getDocs(q);
	return querySnapshot;
}

export async function leaveLobby(id, name) {
	console.log(id, name);
	const document = await getDoc(doc(db, "appmob_lobby", id));
	const data = document.data();
	data.users = data.users.filter((user) => user.name !== name);
	console.log(data.users);
	await setDoc(doc(db, "appmob_lobby", document.id), data);
}

export async function deleteLobby(id) {
	await deleteDoc(doc(db, "appmob_lobby", id));
}

/**
 *
 * @returns {Carte} la carte
 */
export function createCard() {
	const card = {
		value: randint(0, 9),
		color: pickFromArray(["red", "green", "blue", "yellow"]),
	};
	return card;
}

export class UnoUser {
	name = "user";
	/**
	 * @param {Carte} card
	 */
	cards = [];
	host = false;
	winner = -1;

	constructor(name) {
		this.name = name;
		for (let i = 0; i < 7; i++) {
			this.cards.push(createCard());
		}
	}

	makeHost() {
		this.host = true;
		return this;
	}

	setWinner(winner) {
		this.winner = winner;
		return this;
	}

	get() {
		return {
			name: this.name,
			cards: this.cards,
			host: this.host,
		};
	}
}
