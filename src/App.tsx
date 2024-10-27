import Masonry from "@/react-masonify";
import "./app-style.css";
import IMG_DATA from "./data.json";

function App() {
  return (
    <div className="App">
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-4xl font-bold text-center mb-8">
          React Masonify - Masonry Grid Layout
        </h1>
        <div className="max-w-7xl mx-auto">
          <Masonry gap="1rem">
            {IMG_DATA?.map((src) => (
              <ImgCard src={src} key={src} />
            ))}
          </Masonry>
        </div>
      </div>
    </div>
  );
}

export default App;

const ImgCard = ({ src }: { src: string }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
      <img src={src} alt=" Scenic" className="rounded-lg" />
    </div>
  );
};
