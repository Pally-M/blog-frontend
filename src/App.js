import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Pages/Home";
import Post from "./Pages/Post";
import PostList from "./Components/PostList";

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/new-posts" element={<Post />} />
                    <Route path="/posts/:id" element={<PostList />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

