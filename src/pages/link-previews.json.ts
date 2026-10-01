import { getCourses, intro } from "../lib/courses";
import { pageUrl } from "../lib/urls";
import external from "../data/link-previews.json";

export async function GET() {
  const { all } = await getCourses();
  const entries = Object.fromEntries(
    all.map((page) => [
      pageUrl(page.id),
      { title: page.data.title, description: intro(page.body).slice(0, 320) },
    ]),
  );
  return Response.json({ ...external, ...entries });
}
