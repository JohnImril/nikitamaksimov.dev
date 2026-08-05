import { notFound } from "next/navigation";
import { projects, getProject } from "@/content/projects";
import { projectMetadata } from "@/lib/metadata";
import { CaseStudyLayout } from "@/components/case-study/case-study-layout";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getProject((await params).slug);
  return project ? projectMetadata(project) : {};
}
export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return <CaseStudyLayout project={project} />;
}
