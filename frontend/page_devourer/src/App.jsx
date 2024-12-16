import AddBar from "./components/addbar";
import Card from "./components/card";
import SearchBar from "./components/searchbar";
import canddimg from "./assets/cand.png"

function App() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center justify-center w-full h-full pb-5 ">
        <SearchBar />
        <div className="flex flex-col items-center w-2/3 h-6/7 bg-dark mt-2 rounded-2xl">
          <div className="flex w-full pl-12 pr-12">
            <AddBar/>
          </div>
          <div className="flex-grow w-full pl-12 pr-12 grid grid-cols-3">
            <Card url={canddimg}/>
            <Card/>
            <Card/>
            <Card/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
