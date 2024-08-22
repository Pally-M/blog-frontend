import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingPage from "./LoadingDetailPage";

// Utility function to remove asterisks and format content
const formatContent = (content) => {
  // Remove any asterisks and add spacing
  const formattedContent = content.replace(/\*/g, "");
  return formattedContent;
};

const fetchPostsDetails = async (id) => {
  try {
    const response = await axios.get(
      `https://blog-backend-ap5h.onrender.com/posts/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching post details:", error);
    return null;
  }
};

function PostList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postsDetails, setPostsDetails] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const posts = await fetchPostsDetails(id);
      setPostsDetails(posts);
      setComments(posts.comments || []);
    };

    fetchData();
  }, [id]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      try {
        const response = await axios.post(
          `https://blog-backend-ap5h.onrender.com/posts/${id}/comments`,
          { text: newComment }
        );
        setComments([...comments, response.data]);
        setNewComment("");
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  };

  const handleBackClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (!postsDetails) {
    return <LoadingPage />;
  }

  return (
    <section className="bg-hero-pattern bg-cover bg-center overflow-hidden py-24" style={{ backgroundColor: "#f4e9e0" }}>
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-6">
          <button
            className="text-gray-500 group inline-flex items-center gap-2 flex-wrap"
            onClick={handleBackClick}
          >
            <div className="group-hover:text-gray-600 transition duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M15.4167 10H5M5 10L10 5M5 10L10 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            <span className="group-hover:text-gray-600 transition duration-200 font-bold">
              Back to Blog
            </span>
          </button>
        </div>
        <img
          className="w-full h-64 lg:h-96 mx-auto rounded-2xl mb-12 object-cover"
          src={postsDetails.image}
          alt="Blog Post"
        />

        <h1 className="text-center text-3xl lg:text-5xl font-bold mb-12 max-w-xl lg:max-w-3xl mx-auto" style={{ color: "#424d51" }}>
          {postsDetails.title}
        </h1>
        <div className="px-8 lg:px-24">
          <p className="text-lg mb-6" style={{ color: "#424d51" }}>
            {formatContent(postsDetails.content)}
          </p>

          <div className="w-full h-px mb-6" style={{ backgroundColor: "#eedbcd" }}></div>
          
          {/* Comment section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: "#80b4ab" }}>Comments</h2>
            <form onSubmit={handleCommentSubmit} className="mb-4">
              <textarea
                value={newComment}
                onChange={handleCommentChange}
                className="w-full h-24 p-2 border rounded mb-2"
                placeholder="Add a comment"
                style={{ borderColor: "#80b4ab", backgroundColor: "#eedbcd" }}
              />
              <button
                type="submit"
                className="py-2 px-4 text-white rounded transition duration-200"
                style={{ backgroundColor: "#80b4ab" }}
              >
                Submit
              </button>
            </form>
            <div>
              {comments.map((comment, index) => (
                <div key={index} className="mb-2 p-2 border-b" style={{ borderColor: "#eedbcd", backgroundColor: "#f4e9e0" }}>
                  {comment.text}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-px mb-6" style={{ backgroundColor: "#eedbcd" }}></div>
        </div>
      </div>
    </section>
  );
}

export default PostList;
