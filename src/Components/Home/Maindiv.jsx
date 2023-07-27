import MainArticle from "./MainArticle";

import React from 'react'

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

    return (
        <>
            {tags}
        </>
    );
}

export default Maindiv