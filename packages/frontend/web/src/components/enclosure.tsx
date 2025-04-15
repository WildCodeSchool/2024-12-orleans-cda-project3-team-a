import Elf from '../assets/images/fairy-zone/elf.png';

export default function Enclosure() {
  return (
    <div className='bg-fairy-green h-[50%] md:w-[50%]'>
      <img src={Elf} alt='' />
    </div>
  );
}

//Si creature pas debloquer affiche la pierre, si creature debloqué, affiche la creature et le nombre juste en dessous
//Les decos, toujours une en bottom, et une en top, et soit right, soit left
//Créer un fichier avec les chemins des images, pour les passer en props et ne pas tt importer
//Recupere les variables de tes couleurs pour les enclots
//fais les conditions
//
