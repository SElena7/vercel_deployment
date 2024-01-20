import Post from '../post/Post';
import './Posts.scss';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';

const Posts = () => {
    const { isLoading, error, data } = useQuery({
        queryKey: ['posts'],
        queryFn: () => makeRequest.get('/posts').then((res) => res.data),
    });

    console.log(data);

    return (
        <div className="posts">
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                data.map((post) => <Post post={post} key={post.id} />)
            )}
        </div>
    );
};

export default Posts;
