import { endOfWeek, format, parseISO, startOfWeek } from "date-fns";
import { DiaryCard } from "../diaryCardComponent/diaryCard";
import { Container, Grid, WeekTitle } from "../../style/weekGrouped.styles";

export interface IPost {
  title: string;
  emotion: number;
  img: string;
  date: string;
}

type TWeekGroupedProps = {
  posts: IPost[]
}

const groupPostsByWeek = ({ posts }: TWeekGroupedProps) => {
  const grouped: Record<string, IPost[]> = {};

  posts.forEach((post) => {
    const date = parseISO(post.date);
    const weekStart = startOfWeek(date, { weekStartsOn: 1 });
    const key = format(weekStart, 'yyyy-MM-dd');

    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(post);
  })

  return grouped;
}

export const WeekGroupedComponent: React.FC<TWeekGroupedProps> = ({ posts }) => {
  const groupedPosts = groupPostsByWeek({ posts: posts });
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
              {postsInWeek.map((post, i) => (
                <DiaryCard key={i} post={post} />
              ))}
            </Grid>
          </div>
        );
      })}
    </Container>
  )
}
