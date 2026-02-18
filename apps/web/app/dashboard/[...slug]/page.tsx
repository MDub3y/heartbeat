import { WipState } from "../wip.state";

export default async function DashboardCatchAllPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  const lastSegment = slug[slug.length - 1];

  const title = lastSegment
    ?.replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return <WipState title={title || "Work in Progress"} />;
}