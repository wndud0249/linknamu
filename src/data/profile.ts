export type Link = {
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  image: string;
};

// 프로필과 링크는 이 파일만 수정하면 됩니다.
export const profile: Profile = {
  name: "김개발",
  bio: "풀스택 개발자 : 요즘에는 AI 개발에 관심이 많아요",
  image: "https://placehold.co/224x224/orange/white.png",
};

// id는 클릭 수 집계 키로 쓰이므로 한 번 정한 뒤에는 바꾸지 마세요.
export const links: Link[] = [
  { id: "github", title: "GitHub", url: "https://github.com" },
  { id: "blog", title: "블로그", url: "https://velog.io" },
  { id: "instagram", title: "Instagram", url: "https://instagram.com" },
  { id: "youtube", title: "YouTube", url: "https://youtube.com" },
];
