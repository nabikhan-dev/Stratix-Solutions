import Link from "next/link";
import { Newspaper, Briefcase, Sparkles, CircleDollarSign } from "lucide-react";
import { PageHeader, StatCard, HeroFigure, Card } from "@/components/dashboard/ui";
import { listBlogPosts, listProjects, listServices, listFeatureCategories } from "@/lib/dashboard/store";

export default function DashboardOverviewPage() {
  const posts = listBlogPosts();
  const projects = listProjects();
  const services = listServices();
  const categories = listFeatureCategories();
  const totalOptions = categories.reduce((sum, c) => sum + c.options.length, 0);
  const totalManaged = posts.length + projects.length + services.length + totalOptions;

  return (
    <div>
      <PageHeader
        title="Overview"
        description="Manage every page's content from here — blog posts, portfolio projects, services, and pricing."
      />

      <Card className="mb-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <HeroFigure label="Content items under management" value={totalManaged} caption="Across blog, projects, services, and pricing." />
      </Card>


      <div className="grid grid-cols-4 gap-4 sm:grid-cols-4">
        <StatCard label="Blog posts" value={posts.length} href="/dashboard/blog" accent="signal" icon={Newspaper} />
        <StatCard label="Projects" value={projects.length} href="/dashboard/projects" accent="aurora" icon={Briefcase} />
        <StatCard label="Services" value={services.length} href="/dashboard/services" accent="amber" icon={Sparkles} />
        <StatCard label="Pricing line items" value={totalOptions} href="/dashboard/pricing" accent="calm" icon={CircleDollarSign} />
      </div>

      <Card className="mt-6 border-amber/20 bg-amber/5">
        <p className="text-[14px] font-medium text-primary">Content isn&apos;t persisted yet</p>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
          Edits here live in server memory, seeded from <code className="rounded bg-deep px-1 py-0.5 text-[12.5px]">src/data/*.ts</code>.
          They reset on every server restart or redeploy — this is the UI/UX for the admin area,
          built before a database was chosen. Once you pick where content should actually live
          (a database, or writing back to the data files), the store in{" "}
          <code className="rounded bg-deep px-1 py-0.5 text-[12.5px]">src/lib/dashboard/store.ts</code> is the only place that needs to change.
        </p>
      </Card>

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
