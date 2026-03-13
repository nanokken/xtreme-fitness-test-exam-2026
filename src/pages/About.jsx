import Contact from "../components/Contact";
import LatestBlogPosts from "../components/LatestBlogPosts";
import AboutUsVideo from "../components/AboutUsVideo";
import AboutUsSection from "../components/AboutUsSection";

export default function About() {
    return (
        <div>
            <AboutUsSection />
            <AboutUsVideo />
            <Contact />
            <LatestBlogPosts />
        </div>
    );
}