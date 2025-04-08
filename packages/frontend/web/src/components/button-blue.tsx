export default function ButtonBlue() {
  //il faudra faire passer les props plus tard pour background bleu clair (rules) et foncé (log in et sign up et create park)
  //ainsi que la props pour le texte dans le bouton
  //à mettre en props : bg:string, word:string

  //à retirer :
  //il faudra passer soit "bg-primary-blue" soit "bg-tertiary-blue"
  // et il faudra aussi passer le contenu du text
  const bg = 'bg-primary-blue';
  const word = 'LOG IN';

  return (
    <button
      type='button'
      className={`${bg} text-secondary-blue border-secondary-blue min-w-24 cursor-pointer rounded-md border-2 px-2 py-0.5 font-extrabold shadow-[0px_4px_4px_rgba(0,0,0,0.25)] active:shadow-none md:min-w-32`}
    >
      {word}
    </button>
  );
}
