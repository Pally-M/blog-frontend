import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Form() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [comments, setComments] = useState("");
  const API_URL = "https://blog-backend-ap5h.onrender.com/api/posts";
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newPost = {
      title,
      content,
      image,
      comments: comments.split('\n'), // Split comments by new lines
    };

    try {
      const response = await axios.post(API_URL, newPost);

      if (response.status === 201) {
        navigate("/");
      } else {
        console.error("Failed to create post:", response.status, response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="bg-orange-50 py-4">
      <div className="container px-4 mx-auto">
        <div className="p-6 h-full overflow-hidden bg-orange-50 rounded-md">
          <div className="pb-6 border-b border-coolGray-100">
            <div className="flex flex-wrap items-center justify-between -m-2">
              <div className="w-full md:w-auto p-2">
                <h2 className="text-coolGray-900 text-lg font-semibold">
                  Make a New Blog
                </h2>
                <p className="text-xs text-coolGray-500 font-medium">
                  What do you have in mind?
                </p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="py-6 border-b border-coolGray-100">
              <div className="w-full md:w-9/12">
                <div className="flex flex-wrap -m-3">
                  <div className="w-full md:w-1/3 p-3">
                    <p className="text-sm text-coolGray-800 font-semibold">
                      Title
                    </p>
                  </div>
                  <div className="w-full md:flex-1 p-3">
                    <input
                      className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                      type="text"
                      placeholder="Blog Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="py-6 border-b border-coolGray-100">
              <div className="w-full md:w-9/12">
                <div className="flex flex-wrap -m-3">
                  <div className="w-full md:w-1/3 p-3">
                    <p className="text-sm text-coolGray-800 font-semibold">
                      Content
                    </p>
                  </div>
                  <div className="w-full md:flex-1 p-3">
                    <textarea
                      className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                      placeholder="Write your content here..."
                      rows="10"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-6 border-b border-coolGray-100">
              <div className="w-full md:w-9/12">
                <div className="flex flex-wrap -m-3">
                  <div className="w-full md:w-1/3 p-3">
                    <p className="text-sm text-coolGray-800 font-semibold">
                      Image URL
                    </p>
                  </div>
                  <div className="w-full md:flex-1 p-3">
                    <input
                      className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                      type="text"
                      placeholder="Enter image "
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="py-6 border-b border-coolGray-100">
              <div className="w-full md:w-9/12">
                <div className="flex flex-wrap -m-3">
                  <div className="w-full md:w-1/3 p-3">
                    <p className="text-sm text-coolGray-800 font-semibold">
                      Comments
                    </p>
                  </div>
                  <div className="w-full md:flex-1 p-3">
                    <textarea
                      className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                      placeholder="Add comments (one per line)"
                      rows="5"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-6 flex justify-end">
              <div className="w-full md:w-9/12">
                <div className="flex flex-wrap justify-end -m-1.5">
                  <div className="w-full md:w-auto p-1.5">
                    <button
                      type="submit"
                      className="flex flex-wrap justify-center px-4 py-2 bg-green-500 hover:bg-green-600 font-medium text-sm text-white border border-green-500 rounded-md shadow-button"
                    >
                      <p>Save</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Form;


