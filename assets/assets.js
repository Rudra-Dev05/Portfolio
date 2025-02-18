import profile_img from './profile-img.png';

// Only export what's actually being used
export const assets = {
    profile_img
};

export const workData = [
    {
        title: "Project One",
        description: "Project description here...",
        bgImage: "/images/work/work-1.png",
        // ... other project data
    },
    {
        title: "Project Two", 
        description: "Project description here...",
        bgImage: "/images/work/work-2.png",
        // ... other project data
    }
];

export const serviceData = [
    { title: 'Web design', description: 'Web development is the process of building, programming...', link: '' },
    { title: 'Mobile app', description: 'Mobile app development involves creating software for mobile devices...', link: '' },
    { title: 'UI/UX design', description: 'UI/UX design focuses on creating a seamless user experience...', link: '' },
    { title: 'Graphics design', description: 'Creative design solutions to enhance visual communication...', link: '' },
];

// Simplified infoList without unused icons
export const infoList = [
    { title: 'Languages', description: 'Python, Java, JavaScript, React Js, Next Js' },
    { title: 'Education', description: 'B.E in Computer Science (AI&ML)' },
    { title: 'Projects', description: 'Built more than 5 projects' }
];