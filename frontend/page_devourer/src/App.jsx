import AddBar from "./components/addbar";
import Card from "./components/card";
import CardContainer from "./components/cardcontainer";
import SearchBar from "./components/searchbar";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
        <SearchBar />
        <div className="flex flex-col items-center w-4/5 md:w-3/4 xl:w-2/3 h-6/7 pb-5 pl-8 pr-8 sm:pl-12 sm:pr-12 bg-dark mt-1 rounded-2xl ">
          <div className="flex w-full ">
            <AddBar/>
          </div >
          <CardContainer/>
        </div>
      
    </div>
  );
}

export default App;
