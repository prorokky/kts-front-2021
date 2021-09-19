import React from 'react';

import AvatarStyles from './Avatar.module.scss'

type AvatarProps = {
    src?: string,
    alt?: string,
    letter: string
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, letter }) => {
    return (
<<<<<<< HEAD
        <div className='card__avatar'>
            {src && <img className='card__repo-img'
                        src={src}
                        alt={alt}>
                    </img>}
            {!src && <p className='card__repo-letter'>
=======
        <div className={AvatarStyles.card__avatar}>
            {src && <img className={AvatarStyles.card__repo_img}
                        src={src}
                        alt={alt}>
                    </img>}
            {!src && <p className={AvatarStyles.card__repo_letter}>
>>>>>>> hw-3
                        {letter}
                    </p>}
        </div>
    )
}

export default React.memo(Avatar)