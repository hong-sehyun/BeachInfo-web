import MainArticle from "./MainArticle";

import React from 'react'
import './home.css'


const Maindiv = ({ content }) => {

    const tags = [];
    for (let i = 0; i < content.length; i = i + 2) {
        console.log(i);


        tags.push(
            <div className="grid" key={'div' + i}>
             
                <MainArticle item = {content[i]} />
                {(i + 1 < content.length) &&
                <MainArticle item = {content[i+1]} />
                }
            </div>
        );
    }

    // for (let i = 0; i < content.length; i = i +1) {
    //     console.log(i);
    //     tags.push(
    //         <div className="cardDiv" key={'div' + i}>
    //             <MainArticle item = {content[i]} />            
    //         </div>
    //     );
    // }
    return (
        <>
            {tags}
        </>
    );
}

export default Maindiv