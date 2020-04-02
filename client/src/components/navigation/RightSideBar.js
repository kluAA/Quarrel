import React from 'react';

class RightSideBar extends React.Component {
    constructor(props) {
        super(props);
    
    }

    shuffle(arr) {
        let shuffled = [];
        while (arr.length > 0) {
            let randomIdx = Math.floor(Math.random() * arr.length);
            shuffled.push(arr[randomIdx])
            arr.splice(randomIdx, 1);
        }
        return shuffled;
     
    }

    render() {
        
        const kevin = {
            name: "Kevin L.",
            git: "http://github.com/kluaa",
            linkedIn: "https://www.linkedin.com/in/kevin-lu-96b294191/",
            portfolio: "http://kevinlu.netlify.com",
            angel: "https://angel.co/u/kevin-lu-45"
        }

        const javier = {
            name: "Javier O.",
            git: "https://github.com/javiermortiz",
            linkedIn: "https://www.linkedin.com/in/javiermortiz/",
            portfolio: "https://www.javiermortiz.com/",
            angel: "https://angel.co/u/javiermortiz"
        }

        const sammy = {
            name: "Sammy G.",
            git: "",
            linkedIn: "",
            portfolio: "",
            angel: ""
        }


        const elizabeth = {
            name: "Elizabeth D.",
            git: "",
            linkedIn: "",
            portfolio: "",
            angel: ""
        }

        const members = [ kevin, javier, sammy, elizabeth ];

        const links = this.shuffle(members).map(member => {
            return (
                <ul className="rsb-member">
                    <span className="member-name">{member.name}</span>
                    <li>
                        <i className="fab fa-github-square"></i>
                        <a href={member.git}>Github</a>
                    </li>
                    <li>
                        <i className="fab fa-linkedin"></i>
                        <a href={member.linkedIn}>LinkedIn</a>
                    </li>
                    <li>
                        <i className="fab fa-angellist"></i>
                        <a href={member.angel}>AngelList</a>
                    </li>
                    <li>
                        <i className="fas fa-folder"></i>
                        <a href={member.portfolio}>Portfolio</a>
                    </li>
                </ul>
            )
        })

        return (
            <div className="rsb-container">
                {links}
            </div>
        )
    }
}

export default RightSideBar;