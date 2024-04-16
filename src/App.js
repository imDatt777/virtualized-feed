import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Feed from "./components/feed";
import Detail from "./components/detail";

function App() {
    return (
        <div className='App'>
            <Router>
                <Routes>
                    <Route path='/' element={<Feed />} />
                    <Route path='/post/:id' element={<Detail />} />
                </Routes>
            </Router>
            {/* <Feed />
            <Post /> */}
        </div>
    );
}

export default App;
