import './profile.scss'
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from 'react-router-dom';
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
import Update from '../../components/update/Update';


const Profile = () => {

	const [openUpdate, setOpenUpdate] = useState(false);
	const { currentUser } = useContext(AuthContext);
	const u_id = parseInt(useLocation().pathname.split("/")[2]);

	const { isLoading, error, data } = useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			const res = await makeRequest.get("/users/find/" + u_id);
			return res.data;
		},
	});

	const { isLoading: risLoading, data: relationshipData } = useQuery({
		queryKey: ["relationship"],
		queryFn: async () => {
			const res = await makeRequest.get("/relationships?followedUserId=" + u_id);
			return res.data;
		},
	});

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationKey: "following",
		mutationFn: (liked) => {
			if (liked) return makeRequest.delete("/relationships?u_id=" + u_id);
			return makeRequest.post("/relationships", { u_id });
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["user"]);
		},
	});

	const handleFollow = () => {
		// Add a conditional check for relationshipData
		if (relationshipData && relationshipData.includes(currentUser.id)) {
			mutation.mutate(true);
		} else {
			mutation.mutate(false);
		}
	};

	// Add conditional checks for loading, error, and data
	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error: {error.message}</p>;
	}

	if (!data) {
		return <p>No data available</p>;
	}


	return (

		<div className="profile">
			{isLoading ? (
				"loading"
			) : (
				<>
			<div className="images">
				<img src={"/upload/"+data.coverPic} className="cover" />
				<img src={"/upload/"+data.profilePic} className="profilePic" />
			</div>
			<div className="profileContainer">
				<div className="uInfo">
					<div className="left">
						<a href="http://facebook.com">
							<FacebookTwoToneIcon fontSize="large" />
						</a>
						<a href="http://facebook.com">
							<InstagramIcon fontSize="large" />
						</a>
						<a href="http://facebook.com">
							<TwitterIcon fontSize="large" />
						</a>
						<a href="http://facebook.com">
							<LinkedInIcon fontSize="large" />
						</a>
						<a href="http://facebook.com">
							<PinterestIcon fontSize="large" />
						</a>
					</div>
					<div className="center">
									<span>{ data.name }</span>
					<div className="info">
						<div className="item">
							<PlaceIcon />
											<span>{data.city}</span>
						</div>
						<div className="item">
							<LanguageIcon />
											<span>{data.website }</span>
						</div>
									</div>
									{isLoading ? "loading.." : u_id === currentUser.id ? (<button onClick={ () => setOpenUpdate(true)}>update</button>) : (

										<button onClick={handleFollow}>

											{relationshipData && relationshipData.includes(currentUser.id) ? "Following" : "Follow"}
									</button>)}
					</div>
				<div className="right">
					<EmailOutlinedIcon />
					<MoreVertIcon />
					</div>
				</div>
			<Posts/>
						</div>
				</>
			)}


			{openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}


		</div>


	)


}
export default Profile