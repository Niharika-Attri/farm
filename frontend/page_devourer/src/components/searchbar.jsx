import pencilIcon from '../assets/pencil.svg'

function SearchBar() {
    return (
      <div className="flex w-3/4 sm:w-1/2 h-8 bg-dark mb-2 rounded-full">
        <input className="bg-dark text-textcolour rounded-full pl-5 w-full border-0 focus:outline-none" placeholder="Search..." ></input>
        <img src={pencilIcon} alt='pencil icon' className='w-7 pr-3'/>

      </div>
    );
  }
  
  export default SearchBar;
  