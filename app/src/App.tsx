import { BrowserRouter, Route, Routes } from "react-router";
import { DemoPages } from "./pages";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={DemoPages.Home.content} />

        {Object.values(DemoPages).map((page) => (
          <Route key={page.path} path={`/${page.path}`} element={page.content} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
