import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import './Stories.scss';



const Stories = () => {

    const { currentUser } = useContext(AuthContext);
    //TEMPORARY

    const stories = [
        {
            id: 1,
            name: "John Doe",
            img:"https://images.pexels.com/photos/18017465/pexels-photo-18017465/free-photo-of-view-of-the-ipanema-beach-rio-de-janeiro-brazil.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: 2,
            name: "John Doe",
            img: "https://images.pexels.com/photos/18017465/pexels-photo-18017465/free-photo-of-view-of-the-ipanema-beach-rio-de-janeiro-brazil.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: 3,
            name: "John Doe",
            img: "https://images.pexels.com/photos/18017465/pexels-photo-18017465/free-photo-of-view-of-the-ipanema-beach-rio-de-janeiro-brazil.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: 4,
            name: "John Doe",
            img: "https://images.pexels.com/photos/18017465/pexels-photo-18017465/free-photo-of-view-of-the-ipanema-beach-rio-de-janeiro-brazil.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: 5,
            name: "John Doe",
            img: "https://images.pexels.com/photos/18017465/pexels-photo-18017465/free-photo-of-view-of-the-ipanema-beach-rio-de-janeiro-brazil.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: 6,
            name: "John Doe",
            img: "https://images.pexels.com/photos/18017465/pexels-photo-18017465/free-photo-of-view-of-the-ipanema-beach-rio-de-janeiro-brazil.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: 7,
            name: "John Doe",
            img: "https://images.pexels.com/photos/18017465/pexels-photo-18017465/free-photo-of-view-of-the-ipanema-beach-rio-de-janeiro-brazil.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
    ]

    return (
        <div className="stories">
            <div className="story">
                <img src={currentUser.profilePic} alt="" />
                <span>{currentUser.name}</span>
                <button>+</button>

            </div>
            {stories.map(story => (

                <div className="story" key={ story.id }>
                    <img src={story.img} alt="" />
                    <span>{ story.name }</span>
                </div>
            ))}
        </div>
    )
}

export default Stories