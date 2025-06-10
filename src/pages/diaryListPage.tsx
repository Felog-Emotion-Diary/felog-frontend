import { ko } from "date-fns/locale";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { Container, DateContainer, EmotionButton, Header, TagSelect } from "../style/diaryListPage.styles";
import emotions from '../../emotions.json'
import { WeekGroupedComponent } from "../components/weekGroupedComponent/weekGrouped";

export default function DiaryListPage() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  return (
    <Container>
      <Header>
        <form>
          <select name="filters" id="preset">
            <option value="title">제목</option>
            <option value="content">내용</option>
            <option value="all">제목+내용</option>
          </select>
          <input className="searchBar" />
          <button className="searchSubmit" type="submit">검색</button>
        </form>
        <DateContainer>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            dateFormatCalendar="yyyy년 MM월"
            placeholderText="시작 날짜"
            locale={ko}
          />
          <span>~</span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
            dateFormatCalendar="yyyy년 MM월"
            placeholderText="종료 날짜"
            locale={ko}
          />
        </DateContainer>
        <TagSelect>
          <span>감정</span>
          <div className="emotions">
            {
              emotions.map((v, i) => (
                <EmotionButton key={i} $background={v.tagColor}>{v.name}</EmotionButton>
              ))
            }
          </div>
        </TagSelect>
      </Header>
      <WeekGroupedComponent />
    </Container>
  )
}
