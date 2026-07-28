import psaBoothOutdoor from "@/assets/gallery/psa-booth-outdoor.jpg";
import studentFlagCeremony from "@/assets/gallery/student-flag-ceremony.jpg";
import communityGroupPhoto from "@/assets/gallery/community-group-photo.jpg";
import womenGathering from "@/assets/gallery/women-gathering.jpg";
import communityGatheringFlag from "@/assets/gallery/community-gathering-flag.jpg";
import seminarPresentation from "@/assets/gallery/seminar-presentation.jpg";

/** Bundled assets referenced from the database by their source path. */
const LOCAL_ASSETS: Record<string, string> = {
  "/src/assets/gallery/psa-booth-outdoor.jpg": psaBoothOutdoor,
  "/src/assets/gallery/student-flag-ceremony.jpg": studentFlagCeremony,
  "/src/assets/gallery/community-group-photo.jpg": communityGroupPhoto,
  "/src/assets/gallery/women-gathering.jpg": womenGathering,
  "/src/assets/gallery/community-gathering-flag.jpg": communityGatheringFlag,
  "/src/assets/gallery/seminar-presentation.jpg": seminarPresentation,
};

export const resolveMediaUrl = (url: string) => LOCAL_ASSETS[url] ?? url;
