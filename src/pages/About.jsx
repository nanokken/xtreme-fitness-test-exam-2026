import Contact from "../components/Contact";
import LatestBlogPosts from "../components/LatestBlogPosts";
import AboutUsVideo from "../components/AboutUsVideo";
import AboutUsSection from "../components/AboutUsSection";
import PageHeader from "../components/PageHeader";
import aboutHeader from "../assets/headers/aboutHeader.png";

export default function About() {
    return (
        <div>
            <PageHeader backgroundImage={aboutHeader} title="Om Os" />
            <AboutUsSection />
            <AboutUsVideo />
            <Contact />
            <LatestBlogPosts />
        </div>
    );
}