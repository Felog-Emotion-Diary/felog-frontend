import { ko } from "date-fns/locale";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Container, DateContainer, EmotionButton, Header, TagSelect } from "../style/diaryListPage.styles";
import emotions from '../../emotions.json'
import { WeekGroupedComponent } from "../components/weekGroupedComponent/weekGrouped";
import { axiosInstance } from "../utils/axiosInstance";
import { format, parse } from "date-fns";

interface IfetchData {
  date: string;
  emotion: number;
  img: string;
  title: string;
}

export default function DiaryListPage() {
  const today = new Date()
  const aMonthAgo = new Date()
  aMonthAgo.setDate(today.getDate() - 30);

  const [startDate, setStartDate] = useState<Date | null>(aMonthAgo);
  const [endDate, setEndDate] = useState<Date | null>(today);
  const [data, setData] = useState<IfetchData[]>([]);
  const [searchContent, setSearchContent] = useState('');
  const [tempData, setTempData] = useState(data);
  const [selected, setSeleted] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      if (startDate && endDate) {
        const startFormatDate = format(startDate.toString(), 'yyyy-MM-dd');
        const endFormatDate = format(endDate.toString(), 'yyyy-MM-dd')
        const response = await axiosInstance.get(`/api/diaries?startDate=${startFormatDate}&endDate=${endFormatDate}`);
        setData(response.data);
        setTempData(response.data);
      } else {
        console.log('정해진 날짜가 없습니다');
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const dateSearchHandle = () => {
    fetchData();
  }

  const contentSearchHandle = () => {
    if (searchContent === '') {
      setTempData(data);
    } else {
      const filteredData = tempData.filter((post) => post.title.toLowerCase().includes(searchContent.toLowerCase()));
      setTempData(filteredData);
    }
  }

  const tagSelectHandle = (value: number) => {
    setSearchContent('')
    setSeleted(value);
    const filteredData = data.filter((post) => post.emotion === value);
    setTempData(filteredData);
  }

  return (
    <Container>
      <Header>
        <div className="contentSearch">
          <select name="filters" id="preset">
            <option value="title">제목</option>
            <option value="content">내용</option>
            <option value="all">제목+내용</option>
          </select>
          <input className="searchBar" value={searchContent}
            onChange={(e) => setSearchContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                contentSearchHandle();
              }
            }}
            onFocus={() => {
              setSeleted(null);
              setTempData(data);
            }}
          />
          <button className="searchSubmit" type="button"
            onClick={contentSearchHandle}
          >검색</button>
        </div>
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
          <button className="searchSubmit dateSearch" type="button" onClick={dateSearchHandle}>검색</button>
        </DateContainer>
        <TagSelect>
          <span>감정</span>
          <div className="emotions">
            {
              emotions.map((v, i) => (
                <EmotionButton key={i} $background={v.tagColor} $selected={selected === 2 ** i} onClick={() => tagSelectHandle(2 ** i)}>{v.name}</EmotionButton>
              ))
            }
          </div>
        </TagSelect>
      </Header>
      <WeekGroupedComponent posts={tempData} />
    </Container>
  )
}
