"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Newspaper, Briefcase, Sparkles, CircleDollarSign, MessageSquare } from "lucide-react";
import { PageHeader, StatCard, Card } from "@/components/dashboard/ui";
import { listBlogPosts, listProjects, listServices, listTestimonials, listFeatureCategories } from "@/lib/dashboard/store";

export default function DashboardOverviewPage() {
  const [stats, setStats] = useState({
    posts: [] as any[],
    projects: 0,
    services: 0,
    testimonials: 0,
    options: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      listBlogPosts(),
      listProjects(),
      listServices(),
      listTestimonials(),
      listFeatureCategories(),
    ]).then(([posts, projects, services, testimonials, categories]) => {
      setStats({
        posts,
        projects: projects.length,
        services: services.length,
        testimonials: testimonials.length,
        options: categories.reduce((sum, c) => sum + c.options.length, 0),
      });
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="py-12 text-center text-[13.5px] text-muted">Loading…</p>;

  return (
    <div>
      <PageHeader
        title="Overview"
        description="Manage every page's content from here — blog posts, portfolio projects, services, and pricing."
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        <StatCard label="Blog posts" value={stats.posts.length} href="/dashboard/blog" accent="signal" icon={Newspaper} />
        <StatCard label="Projects" value={stats.projects} href="/dashboard/projects" accent="aurora" icon={Briefcase} />
        <StatCard label="Testimonials" value={stats.testimonials} href="/dashboard/testimonials" accent="signal" icon={MessageSquare} />
        <StatCard label="Services" value={stats.services} href="/dashboard/services" accent="amber" icon={Sparkles} />
        <StatCard label="Pricing line items" value={stats.options} href="/dashboard/pricing" accent="calm" icon={CircleDollarSign} />
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
          {stats.posts[0] ? (
            <div className="mt-3">
              <p className="text-[14px] font-medium text-primary">{stats.posts[0].title}</p>
              <p className="mt-1 text-[13px] text-muted">
                {stats.posts[0].category} · {stats.posts[0].date}
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
