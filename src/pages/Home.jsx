import SubscriptionCards from "../components/SubscriptionCards";
import ServiceCards from "../components/ServiceCards";
import Contact from "../components/Contact";
import LatestBlogPosts from "../components/LatestBlogPosts";
import TeamMembers from "../components/TeamMembers";
import HeroSection from "../components/HeroSection";
import Exercises from "../components/Exercises";
import AboutUsSection from "../components/AboutUsSection";
import Reviews from "../components/Reviews";

export default function Home() {
    return (
        <>
            <HeroSection />
            <div className="">
                <Exercises />
                <AboutUsSection showStats />
                <ServiceCards />
                <Reviews />
                <SubscriptionCards />
                <TeamMembers textColor="text-light" mobileCount={1} desktopCount={3} className="bg-gradient-brand text-black"/>
                <Contact />
                <LatestBlogPosts />
            </div>
        </>
    );
}