import Link from "next/link";
import { Newspaper, Briefcase, Sparkles, CircleDollarSign, MessageSquare } from "lucide-react";
import { PageHeader, StatCard, Card } from "@/components/dashboard/ui";
import { listBlogPosts, listProjects, listServices, listTestimonials, listFeatureCategories } from "@/lib/dashboard/store";

export default async function DashboardOverviewPage() {
  const posts = await listBlogPosts();
  const projects = await listProjects();
  const services = await listServices();
  const testimonials = await listTestimonials();
  
  const categories = await listFeatureCategories();
  const totalOptions = categories.reduce((sum, c) => sum + c.options.length, 0);

  return (
    <div>
      <PageHeader
        title="Overview"
        description="Manage every page's content from here — blog posts, portfolio projects, services, and pricing."
      />



      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        <StatCard label="Blog posts" value={posts.length} href="/dashboard/blog" accent="signal" icon={Newspaper} />
        <StatCard label="Projects" value={projects.length} href="/dashboard/projects" accent="aurora" icon={Briefcase} />
        <StatCard label="Testimonials" value={testimonials.length} href="/dashboard/testimonials" accent="signal" icon={MessageSquare} />
        <StatCard label="Services" value={services.length} href="/dashboard/services" accent="amber" icon={Sparkles} />
        <StatCard label="Pricing line items" value={totalOptions} href="/dashboard/pricing" accent="calm" icon={CircleDollarSign} />
      </div>




      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Card>
          <h2 className="text-[15px] font-semibold text-primary">Quick links</h2>
          <div className="mt-3 flex flex-col gap-1">
            <Link href="/dashboard/blog/new" className="text-[13.5px] text-signal hover:underline">
              + New blog post
            </Link>
            <Link href="/dashboard/projects/new" className="text-[13.5px] text-signal hover:underline">
              + New project
            </Link>
            <Link href="/dashboard/testimonials/new" className="text-[13.5px] text-signal hover:underline">
              + New testimonial
            </Link>
            <Link href="/dashboard/settings" className="text-[13.5px] text-signal hover:underline">
              Edit site settings
            </Link>
          </div>
        </Card>
        <Card>
          <h2 className="text-[15px] font-semibold text-primary">Most recent post</h2>
          {posts[0] ? (
            <div className="mt-3">
              <p className="text-[14px] font-medium text-primary">{posts[0].title}</p>
              <p className="mt-1 text-[13px] text-muted">
                {posts[0].category} · {posts[0].date}
              </p>
            </div>
          ) : (
            <p className="mt-3 text-[13.5px] text-muted">No posts yet.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
