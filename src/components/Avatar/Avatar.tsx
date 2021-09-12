import React from 'react';

import './Avatar.css'

type AvatarProps = {
    src?: string,
    alt?: string,
    letter: string
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, letter }) => {
    return (
        <div className='card__avatar'>
            {src && <img className='card__repo-img'
                        src={src}
                        alt={alt}>
                    </img>}
            {!src && <p className='card__repo-letter'>
                        {letter}
                    </p>}
        </div>
    )
}

export default React.memo(Avatar)