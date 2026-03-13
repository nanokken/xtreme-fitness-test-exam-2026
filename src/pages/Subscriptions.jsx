import SubscriptionCards from "../components/SubscriptionCards";
import LatestBlogPosts from "../components/LatestBlogPosts";
import Reviews from "../components/Reviews";
import PageHeader from "../components/PageHeader";
import subscriptionsHeader from "../assets/headers/subscriptionsHeader.png";

export default function Subscriptions() {
    return (
                <div>
                    <PageHeader backgroundImage={subscriptionsHeader} title="Priser" />
                    <SubscriptionCards />
                    <Reviews />

                    <LatestBlogPosts />
                </div>
    );
}