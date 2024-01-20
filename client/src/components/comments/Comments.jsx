import "./comments.scss"
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import moment from "moment";
import {  useMutation, QueryClient } from "@tanstack/react-query";

const Comments = (postId) => {

	const [desc, setDesc] = useState("");
	const { currentUser } = useContext(AuthContext);

    const { isLoading, error, data } = useQuery({
        queryKey: ["comments"],
        queryFn: () => makeRequest.get(`/comments?postId=${postId.postId}`).then((res) => res.data),
    });
	const queryClient = new QueryClient();

    const mutation = useMutation({
        mutationFn: (newComment) => {
            return makeRequest.post("/comments", newComment);
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["comments"]);
        },
    });

	

    const handleClick = async (e) => {
        e.preventDefault();
        mutation.mutate({ desc, postId: postId.postId }); // Access the postId property
        setDesc("");
    };



    return (
        <div className="comments">
            <div className="write">
                <img src={"/upload/" + currentUser.profilePic} alt="" />
                <input
                    type="text"
                    placeholder="write a comment"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
                <button onClick={handleClick}>Send</button>
            </div>
            {error
                ? "Something went wrong"
                : isLoading
                    ? "loading"
                    : data.map((comment) => (
                        <div className="comment">
                            <img src={"/upload/" + comment.profilePic} alt="" />
                            <div className="info">
                                <span>{comment.name}</span>
                                <p>{comment.desc}</p>
                            </div>
                            <span className="date">
                                {moment(comment.createdAt).fromNow()}
                            </span>
                        </div>
                    ))}
        </div>
    );

}
export default Comments