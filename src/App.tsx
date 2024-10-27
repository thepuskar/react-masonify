import Masonry, { ResponsiveMasonry } from "@/react-masonify";
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
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry gap="1rem">
              {IMG_DATA?.map((src) => (
                <ImgCard src={src} key={src} />
              ))}
            </Masonry>
          </ResponsiveMasonry>
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
