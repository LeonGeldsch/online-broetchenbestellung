import { createContext, useState } from "react";

const BakeryContext = createContext();

function BakeryProvider({children}) {
    const [selectedBakery, setSelectedBakery] = useState(null);
  
    return (
      <BakeryContext.Provider value={{selectedBakery, setSelectedBakery}}>
        {children}
      </BakeryContext.Provider>
    )
}

export { BakeryContext, BakeryProvider };