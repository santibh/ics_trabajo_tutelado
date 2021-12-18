import React from 'react';

const Post = ({id, owner, title}) => {
    return ( <p id={id}>{owner}: {title}</p> );
}

export default Post;