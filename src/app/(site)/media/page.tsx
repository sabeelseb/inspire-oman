import MediaClient from "./MediaClient";
import {
  getCmsGallery,
  getCmsPageMedia,
  getCmsPress,
  getCmsVideos,
} from "@/lib/cms";

export default async function MediaPage() {
  const [page, videos, gallery, press] = await Promise.all([
    getCmsPageMedia(),
    getCmsVideos(),
    getCmsGallery(),
    getCmsPress(),
  ]);

  return (
    <MediaClient page={page} videos={videos} gallery={gallery} press={press} />
  );
}
