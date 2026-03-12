import SubscriptionCards from "../components/SubscriptionCards";
import ServiceCards from "../components/ServiceCards";
import Contact from "../components/Contact";
import LatestBlogPosts from "../components/LatestBlogPosts";
import TeamMembers from "../components/TeamMembers";
import HeroSection from "../components/HeroSection";

export default function Home() {
    return (
        <>
            <HeroSection />
            <div className="">
                <ServiceCards />
                <SubscriptionCards />
                <TeamMembers textColor="text-light" mobileCount={1} desktopCount={3} className="bg-gradient-brand text-black"/>
                <Contact />
                <LatestBlogPosts />
            </div>
        </>
    );
}