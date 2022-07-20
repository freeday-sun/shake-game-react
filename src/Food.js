import React from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
    const style = {
        left: `${props.foodDot[0]}%`,
        top: `${props.foodDot[1]}%`
    }
    return (
        <div className="snakeFood" style={style}/>
    )
}
