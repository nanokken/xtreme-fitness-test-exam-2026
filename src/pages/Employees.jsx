import Contact from "../components/Contact";
import TeamMembers from "../components/TeamMembers";
import LatestBlogPosts from "../components/LatestBlogPosts";
import PageHeader from "../components/PageHeader";
import employeesHeader from "../assets/headers/employeesHeader.jpg";

export default function Employees() {
    return (
        <div>
            <PageHeader backgroundImage={employeesHeader} title="Trænere" />
            <TeamMembers textColor="text-dark" mobileCount={6} desktopCount={6} className="bg-white"/>
                <Contact />
                <LatestBlogPosts />
            </div>
    );
}