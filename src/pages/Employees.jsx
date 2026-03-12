import Contact from "../components/Contact";
import TeamMembers from "../components/TeamMembers";
import LatestBlogPosts from "../components/LatestBlogPosts";

export default function Employees() {
    return (
        <div>
            <TeamMembers textColor="text-dark" mobileCount={6} desktopCount={6} className="bg-white"/>
                <Contact />
                <LatestBlogPosts />
            </div>
    );
}