import { sharedLibraryModernization as study } from "@/content/commercial";
import { CommercialCaseStudy } from "@/components/case-study/commercial-case-study";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/content/projects";
import { projectMetadata, projectStructuredData } from "@/lib/metadata";
import { CaseStudyLayout } from "@/components/case-study/case-study-layout";
import { insomnia } from "@/content/insomnia";
import { InsomniaCaseStudy } from "@/components/case-study/insomnia-case-study";

function getCaseStudy(slug: string) {
  if (slug === insomnia.slug) return insomnia;
  return slug === study.slug ? study : getProject(slug);
}

export function generateStaticParams() {
  return [...projects, study, insomnia].map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const project = getCaseStudy(slug);
  return project ? projectMetadata(project) : {};
}
export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const project = getCaseStudy(slug);
  if (!project) notFound();
  return (
    <>
      {"repository" in project && project.slug === insomnia.slug ? (
        <InsomniaCaseStudy />
      ) : "sections" in project ? (
        <CommercialCaseStudy />
      ) : "demo" in project ? (
        <CaseStudyLayout project={project} />
      ) : null}
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
