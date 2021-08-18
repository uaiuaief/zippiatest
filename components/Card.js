import React, { Component } from 'react';

class Card extends Component {
    render() {
        const { jobTitle, companyName, shortDesc} = this.props
        return (
            <div className="card">
                <p className="job-title">{jobTitle}</p>
                <p className="company-name">{companyName}</p>
                <p className="short-description">{shortDesc}…</p>
            </div>
        );
    }
}

export default Card;
