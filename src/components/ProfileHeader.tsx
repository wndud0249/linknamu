import Image from "next/image";
import type { Profile } from "@/data/profile";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center text-center">
      <Image
        src={profile.image}
        alt={`${profile.name} 프로필 사진`}
        width={112}
        height={112}
        priority
        className="h-28 w-28 rounded-full object-cover ring-4 ring-white/80 shadow-[0_12px_32px_-10px_rgba(150,80,40,0.45),0_2px_6px_rgba(150,80,40,0.12)] dark:ring-white/10 dark:shadow-[0_12px_32px_-10px_rgba(0,0,0,0.7)]"
      />
      <h1 className="mt-6 text-2xl font-bold tracking-tight">{profile.name}</h1>
      <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-muted">
        {profile.bio}
      </p>
    </header>
  );
}
