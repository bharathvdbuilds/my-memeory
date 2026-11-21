import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { About } from "./pages/About";
import { Architecture } from "./pages/Architecture";
import { Civil } from "./pages/Civil";
import { Commercial } from "./pages/Commercial";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { JointVentures } from "./pages/JointVentures";
import { Materials } from "./pages/Materials";
import { PebIndustrial } from "./pages/PebIndustrial";
import { Projects } from "./pages/Projects";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="civil-construction" element={<Civil />} />
        <Route path="commercial-construction" element={<Commercial />} />
        <Route path="peb-industrial" element={<PebIndustrial />} />
        <Route path="architecture" element={<Architecture />} />
        <Route path="projects" element={<Projects />} />
        <Route path="material-collaborations" element={<Materials />} />
        <Route path="joint-ventures" element={<JointVentures />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
