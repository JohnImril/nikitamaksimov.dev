import { sharedLibraryModernization as study } from "@/content/commercial";
import { CommercialCaseStudy } from "@/components/case-study/commercial-case-study";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/content/projects";
import { projectMetadata, projectStructuredData } from "@/lib/metadata";
import { CaseStudyLayout } from "@/components/case-study/case-study-layout";

export function generateStaticParams() {
  return [...projects, study].map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const project = slug === study.slug ? study : getProject(slug);
  return project ? projectMetadata(project) : {};
}
export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const project = slug === study.slug ? study : getProject(slug);
  if (!project) notFound();
  return (
    <>
      {"sections" in project ? (
        <CommercialCaseStudy />
      ) : (
        <CaseStudyLayout project={project} />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectStructuredData(project)).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
    </>
  );
}
