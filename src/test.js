import React, {useState} from "react";


export default function Test(){

    const [ingredients, setIngredients] = useState([]);

    const handleChange = (e) => {
        let object = {"quantite": e.target.value};
        const listeQuantite = [...ingredients, object];
        setIngredients(listeQuantite);
        console.log(listeQuantite);
    }

    return(
        <div>
            <input id="10" type="number" placeholder="counter" onBlur={handleChange}/>
            <input id="20" type="number" placeholder="counter" onBlur={handleChange}/>
            <input id="30" type="number" placeholder="counter" onBlur={handleChange}/>

        </div>
    );
}

