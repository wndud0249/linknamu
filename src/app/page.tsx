import LinkList from "@/components/LinkList";
import ProfileHeader from "@/components/ProfileHeader";
import { links, profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 py-16 sm:py-24">
      <ProfileHeader profile={profile} />
      <LinkList links={links} />
    </main>
  );
}
