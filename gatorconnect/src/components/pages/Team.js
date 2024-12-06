import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import './Team.css';

function Team() {
    const teamMembers = [
        {
            name: 'Ru E',
            role: '',
            bio: '',
            image: '-image.jpg',
        },
        {
            name: 'Bernard K',
            role: '',
            bio: '',
            image: '-image.jpg',
        },
        {
            name: 'Erick G',
            role: '',
            bio: '',
            image: '-image.jpg',
        },
    ];

    return (
        <>
            <div className="team-container">
                <h1 className="team-title">Meet the Team</h1>
                <div className="team-members">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="team-member-card">
                            <img src={'/images/profileicon.png'} alt={member.name} className="team-member-image" />
                            <h2 className="team-member-name">{member.name}</h2>
                            <h3 className="team-member-role">{member.role}</h3>
                            <p className="team-member-bio">{member.bio}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Team;
