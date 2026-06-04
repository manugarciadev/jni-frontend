import Cta from "@layouts/components/Cta";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import Features from "@layouts/partials/Features";
import HomeBanner from "@layouts/partials/HomeBanner";
import RecentBlog from "@layouts/partials/RecentBlog";
import WeeklyActivity from "@layouts/partials/WeeklyActivity";
import SeoMeta from "@layouts/partials/SeoMeta";
import ShortIntro from "@layouts/partials/ShortIntro";
import Testimonial from "@layouts/partials/Testimonial";
import { getListPage, getSinglePage } from "@lib/contentParser";
import config from "@config/config.json";

const Home = async () => {
  const homepage = await getListPage("content/_index.md");
  const { frontmatter } = homepage;
  const { banner, brands, features, intro, testimonial } = frontmatter;
  
  // Get recent blog posts
  const { blog_folder } = config.settings;
  const posts = await getSinglePage(`content/${blog_folder}`);
  
  return (
    <GSAPWrapper>
      <SeoMeta title="Home" />
      <HomeBanner banner={banner} brands={brands} />
      <RecentBlog posts={posts} />
      <WeeklyActivity />
      
      <Features features={features} />
      <ShortIntro intro={intro} />
      <Testimonial testimonial={testimonial} />
      <Cta />
    </GSAPWrapper>
  );
};

export default Home;
