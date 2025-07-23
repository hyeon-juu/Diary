import { useParams } from "react-router-dom";

function ViewDiary() {
  const { date } = useParams();

  return <div>{date}입니다.</div>;
}
export default ViewDiary;
