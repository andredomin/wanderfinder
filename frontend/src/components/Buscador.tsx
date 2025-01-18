import { useState } from "react";

interface BuscadorProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    onPriceFilterChange: (price: string | null) => void;
    onContinentFilterChange: (continent: string | null) => void;
}

const Buscador: React.FC<BuscadorProps> = ({
    searchTerm, 
    onSearchChange, 
    onPriceFilterChange,
    onContinentFilterChange
}) => {

  const [activePrice, setActivePrice] = useState<string | null>(null);
  const [activeContinent, setActiveContinent] = useState<string | null>(null);

  const handlePriceFilterClick = (price: string | null) => {
    setActivePrice(price === activePrice ? null : price);
    onPriceFilterChange(price === activePrice ? null : price);
  };

  const handleContinentFilterClick = (continent: string | null) => {
    setActiveContinent(continent === activeContinent ? null : continent);
    onContinentFilterChange(continent === activeContinent ? null : continent);
  };

  return (
    <>
    <div className="header">
        
        <div>Buscador de países:</div>
        <div style={{ marginBottom: '20px' }}>
        <input
        type="text"
        placeholder="Escribe aquí tu destino..."
        value={searchTerm} 
        onChange={(e) => onSearchChange(e.target.value)}
        />
        </div>
        <div style={{ marginTop: '20px' }}>Filtrar por precio:</div>
        <div className="button-container">
        <button 
          className="price-filter" 
          onClick={() => handlePriceFilterClick(null)} 
          style={{ padding: '5px 10px', backgroundColor: activePrice === null ? 'black' : 'gray' }}>
            Todos
        </button>
        <button 
          className="price-filter" 
          onClick={() => handlePriceFilterClick('€')} 
          style={{ padding: '5px 10px', backgroundColor: activePrice === '€' ? 'black' : 'gray' }}>
            €
        </button>
        <button 
          className="price-filter" 
          onClick={() => handlePriceFilterClick('€€')} 
          style={{ padding: '5px 10px', backgroundColor: activePrice === '€€' ? 'black' : 'grey'}}>
           €€
        </button>
        <button 
          className="price-filter" 
          onClick={() => handlePriceFilterClick('€€€')} 
          style={{ padding: '5px 10px', backgroundColor: activePrice === '€€€' ? 'black' : 'gray' }}>
            €€€
        </button>
        </div>

        <div style={{ marginTop: '20px' }}>Filtrar por continente:</div>
        <div className="button-container">
        <button 
          className="continent-filter" 
          onClick={() => handleContinentFilterClick(null)} 
          style={{ padding: '5px 10px', backgroundColor: activeContinent === null ? 'black' : 'gray' }}>
            Todos
        </button>
        <button 
          className="continent-filter" 
          onClick={() => handleContinentFilterClick('Europa')} 
          style={{ padding: '5px 10px', backgroundColor: activeContinent === 'Europa' ? 'black' : 'gray', marginLeft: '2vw' }}>
            Europa 🌍
        </button>
        <button 
          className="continent-filter" 
          onClick={() => handleContinentFilterClick('Asia')} 
          style={{ padding: '5px 10px', backgroundColor: activeContinent === 'Asia' ? 'black' : 'gray', marginLeft: '2vw' }}>
            Asia 🌏
        </button>
        <button 
          className="continent-filter" 
          onClick={() => handleContinentFilterClick('América')} 
          style={{ padding: '5px 10px', backgroundColor: activeContinent === 'América' ? 'black' : 'gray', marginLeft: '2vw' }}>
            América 🌎
        </button>
        </div>
      </div>
    </>
  );
}

export default Buscador;
