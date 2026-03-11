import Contact from "../components/Contact";
import TeamMembers from "../components/TeamMembers";

export default function Employees() {
    return (
        <div>
            <TeamMembers textColor="text-dark" mobileCount={6} desktopCount={6} className="bg-white"/>
                <Contact />
            </div>
    );
}