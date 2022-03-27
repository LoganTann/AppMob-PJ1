export function convertAuthMessage(error) {
	switch (error.code) {
		case "auth/email-already-in-use":
			return "Cette adresse email est déjà utilisée.";
		case "auth/invalid-email":
			return "Cette adresse email n'est pas valide.";
		case "auth/operation-not-allowed":
			return "Cette opération n'est pas autorisée.";
		case "auth/weak-password":
			return "Ce mot de passe est trop faible.";
		case "auth/wrong-password":
			return "Ce mot de passe est incorrect.";
		default:
			return "Une erreur est survenue.";
	}
}
