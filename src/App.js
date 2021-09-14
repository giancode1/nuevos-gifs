import { useState, useEffect } from "react";
import { Item } from "./components/Item";

export function App() {
  const [images, setImages] = useState([]);
  const [inputValue, setInputValue] = useState("Rick");

  useEffect(() => {
    getGifs(inputValue);
  }, []);

  const getGifs = async (value) => {
    const url = `https://api.giphy.com/v1/gifs/search?q=${encodeURI(
      value
    )}&limit=10&api_key=ipcsgMPL6C2ztKNjIHLJ3DMKJdWh465V`;
    const resp = await fetch(url);
    const { data } = await resp.json();

    const gifs = data.map((img) => {
      return {
        id: img.id,
        title: img.title,
        url: img.images?.downsized_medium.url
      };
    });
    setImages(gifs);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getGifs(inputValue);
  };

  return (
    <div className="App">
      <h1>Buscar Gifs</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button value="Submit">Buscar</button>
      </form>
      <br />
      {images.map((img) => (
        <Item key={img.id} {...img} />
      ))}
    </div>
  );
}
