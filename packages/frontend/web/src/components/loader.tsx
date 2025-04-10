import loader from '../assets/images/icons-buttons/loader.png';

export default function Loader() {
    return (
      <div className="flex items-center justify-center w-14 h-14 text-center rounded-[50px] blur-[1px] bg-[linear-gradient(to_bottom,_#BA42FF,_#00E1FF)] shadow-[0px_-5px_20px_0px_rgb(186,_66,_255),_0px_5px_20px_0px_rgb(0,_225,_255)] animate-spin">
        <div className="w-12 h-12 rounded-[50px] blur-[1px] bg-secondary-gray"></div>
        <img src={loader} alt="loader" className=''/>
      </div>
    );
  }

