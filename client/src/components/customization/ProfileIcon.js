import React from 'react';

class ProfileIcon extends React.Component {
    constructor(props) {
        super(props);
    }

    //fields are: profileUrl, size, fsize, and fname


    render() {
        const { size, profileUrl, fname, fsize } = this.props;
        const letter = fname[0].toUpperCase();
        const defaultIcon = (
            <div style={{
                background: `${"red"}`,
                height: `${size}px`,
                width: `${size}px`,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <div style={{
                    color: "white",
                    fontSize: `${fsize}px`
                }}>
                    {letter}
                </div>
            </div>
        )
        const imgIcon = (
            <img src={profileUrl}
                style={{
                    height: `${size}px`,
                    width: `${size}px`,
                    borderRadius: "50%",
                }}
            ></img>
        );
        
        const decide = (profileUrl.slice(0,4) === 'http');

        return decide ? imgIcon : defaultIcon;
    }

}

export default ProfileIcon;