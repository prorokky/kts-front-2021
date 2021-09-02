import React from 'react';

import './Avatar.css'

type AvatarProps = {
    src?: string,
    alt?: string,
    letter: string
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, letter }) => {
    let ava: JSX.Element

    if (src) {
        ava =   <img className='card__repo-img'
                    src={src}
                    alt={alt}>
                </img>
    } else {
        ava =   <p className='card__repo-letter'>
                    {letter}
                </p>
    }

    return (
        <div className='card__avatar'>
            {ava}
        </div>
    )
}

export default Avatar