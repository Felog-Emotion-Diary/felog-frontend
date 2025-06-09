import { endOfWeek, format, parseISO, startOfWeek } from "date-fns";
import { DiaryCard } from "../diaryCardComponent/diaryCard";
import { Container, Grid, WeekTitle } from "../../style/weekGrouped.styles";

export type TPost = {
  id: string;
  title: string;
  imageUrl: string;
  createdAt: string;
}

const posts = [
  {
    id: "1",
    title: "풍경 사진",
    imageUrl: "https://via.placeholder.com/300x200?text=Photo+1",
    createdAt: "2025-06-03",
  },
  {
    id: "2",
    title: "바다 사진",
    imageUrl: "https://via.placeholder.com/300x200?text=Photo+2",
    createdAt: "2025-06-05",
  },
  {
    id: "3",
    title: "고양이",
    imageUrl: "https://via.placeholder.com/300x200?text=Photo+3",
    createdAt: "2025-06-07",
  },
  {
    id: "4",
    title: "하늘 사진",
    imageUrl: "https://via.placeholder.com/300x200?text=Photo+4",
    createdAt: "2025-05-28",
  },
];

function groupPostsByWeek(posts: TPost[]): Record<string, TPost[]> {
  const grouped: Record<string, TPost[]> = {};

  posts.forEach((post) => {
    const date = parseISO(post.createdAt);
    const weekStart = startOfWeek(date, { weekStartsOn: 1 });
    const key = format(weekStart, 'yyyy-MM-dd');

    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(post);
  })

  return grouped;
}
export const WeekGroupedComponent: React.FC = () => {
  const groupedPosts = groupPostsByWeek(posts);
  const sortedWeeks = Object.keys(groupedPosts).sort((a, b) => (a < b ? 1 : -1));
  return (
    <Container>
      {sortedWeeks.map((weekStart) => {
        const postsInWeek = groupedPosts[weekStart];
        const weekEnd = format(endOfWeek(parseISO(weekStart), { weekStartsOn: 1 }), "yyyy-MM-dd");

        return (
          <div key={weekStart}>
            <WeekTitle>
              {weekStart} ~ {weekEnd}
            </WeekTitle>
            <hr className="dividLine" />
            <Grid>
              {postsInWeek.map((post) => (
                <DiaryCard key={post.id} post={post} />
              ))}
            </Grid>
          </div>
        );
      })}
    </Container>
  )
}
